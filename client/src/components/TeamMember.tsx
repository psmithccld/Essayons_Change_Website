import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export default function TeamMember({ name, role, bio, initials }: TeamMemberProps) {
  return (
    <Card className="text-center hover-elevate" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold" data-testid="text-name">{name}</h3>
          <p className="text-sm text-muted-foreground" data-testid="text-role">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground" data-testid="text-bio">{bio}</p>
      </CardContent>
    </Card>
  );
}
