import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Minus,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your content...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt || 'Image' }).run();
      setImageUrl('');
      setImageAlt('');
      setShowImageInput(false);
    }
  }, [editor, imageUrl, imageAlt]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${className || ''}`}>
      <div className="bg-muted/50 border-b p-2 flex flex-wrap gap-1" data-testid="rich-text-toolbar">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
          data-testid="button-undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
          data-testid="button-redo"
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
          data-testid="button-h1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
          data-testid="button-h2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
          data-testid="button-h3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        <Button
          type="button"
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          data-testid="button-bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          data-testid="button-italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
          data-testid="button-underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
          data-testid="button-strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('code') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline Code"
          data-testid="button-code"
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          data-testid="button-bullet-list"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
          data-testid="button-ordered-list"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
          data-testid="button-quote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
          data-testid="button-hr"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
          data-testid="button-align-left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
          data-testid="button-align-center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
          data-testid="button-align-right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        <Button
          type="button"
          variant={editor.isActive('link') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (editor.isActive('link')) {
              removeLink();
            } else {
              setShowLinkInput(!showLinkInput);
            }
          }}
          title="Link"
          data-testid="button-link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageInput(!showImageInput)}
          title="Insert Image"
          data-testid="button-insert-image"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      {showLinkInput && (
        <div className="p-3 border-b bg-muted/30 flex gap-2 items-center" data-testid="link-input-panel">
          <Label htmlFor="link-url" className="sr-only">URL</Label>
          <Input
            id="link-url"
            type="url"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1"
            data-testid="input-link-url"
          />
          <Button type="button" size="sm" onClick={addLink} data-testid="button-confirm-link">
            Add Link
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowLinkInput(false)} data-testid="button-cancel-link">
            Cancel
          </Button>
        </div>
      )}

      {showImageInput && (
        <div className="p-3 border-b bg-muted/30 space-y-2" data-testid="image-input-panel">
          <div className="flex gap-2 items-center">
            <Label htmlFor="image-url" className="sr-only">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1"
              data-testid="input-inline-image-url"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="image-alt" className="sr-only">Alt Text</Label>
            <Input
              id="image-alt"
              type="text"
              placeholder="Alt text (optional)..."
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="flex-1"
              data-testid="input-inline-image-alt"
            />
            <Button type="button" size="sm" onClick={addImage} disabled={!imageUrl} data-testid="button-confirm-image">
              Insert Image
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowImageInput(false)} data-testid="button-cancel-image">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} className="bg-background" data-testid="rich-text-content" />
    </div>
  );
}
