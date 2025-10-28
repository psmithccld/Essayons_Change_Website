import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SKILL_LABELS: Record<string, string> = {
  activeListening: "Active Listening",
  empathy: "Empathy",
  validation: "Validation",
  selfAwareness: "Self Awareness",
  selfControl: "Self Control",
  relationshipAwareness: "Relationship Awareness",
  relationshipManagement: "Relationship Management",
  motivation: "Motivation",
  engagement: "Engagement",
  technical: "Technical Skills",
  jobCost: "Job Cost",
  presentation: "Presentation Skills",
};

const SAMPLE_CARDS = [
  {
    id: "c1",
    title: "Active Listening",
    category: "Emotional Intelligence",
    body: "Open yourself up to truly hear the other person. Make the speaker the center of your attention.",
    effect: { type: "skill", skillKey: "activeListening", amount: 1 },
  },
  {
    id: "c2",
    title: "Empathy",
    category: "Emotional Intelligence",
    body: "Acknowledge feelings and perspectives. Build trust through understanding.",
    effect: { type: "skill", skillKey: "empathy", amount: 1 },
  },
  {
    id: "c3",
    title: "Validation",
    category: "Emotional Intelligence",
    body: "Name the emotion, validate the experience, and reduce defensiveness.",
    effect: { type: "points", amount: 2 },
  },
  {
    id: "c4",
    title: "Self Control",
    category: "Emotional Intelligence",
    body: "Pause before reacting. Choose the most constructive response.",
    effect: { type: "skill", skillKey: "selfControl", amount: 1 },
  },
  {
    id: "c5",
    title: "Stakeholder Brief",
    category: "Presentation Skills",
    body: "You clearly frame intent and outcomes for your stakeholders.",
    effect: { type: "points", amount: 3 },
  },
  {
    id: "c6",
    title: "Optimize Overtime",
    category: "Job Cost",
    body: "You balance burn rate and deadlines to protect margin.",
    effect: { type: "skill", skillKey: "jobCost", amount: 1 },
  },
  {
    id: "c7",
    title: "Teach Problem-Solving",
    category: "Technical Skills",
    body: "You mentor a teammate to solve issues independently.",
    effect: { type: "skill", skillKey: "technical", amount: 1 },
  },
  {
    id: "c8",
    title: "Draw 2 Cards",
    category: "Learning Boost",
    body: "Curiosity compounds. Draw two additional cards.",
    effect: { type: "draw", amount: 2 },
  },
  {
    id: "c9",
    title: "Momentum",
    category: "Engagement",
    body: "Your team rallies behind a clear goal. Advance 2 spaces.",
    effect: { type: "move", spaces: 2 },
  },
  {
    id: "c10",
    title: "Reflection Day",
    category: "Well-being",
    body: "You create space for reflection. Skip your next turn (but gain +1 Self Awareness).",
    effect: { type: "skip", turns: 1 },
  },
];

const TILE_TYPES = ["START", "LEARN", "CHALLENGE", "EVENT", "REST", "FINISH"] as const;
type TileType = typeof TILE_TYPES[number];
type Tile = { idx: number; type: TileType; label?: string; requirement?: { skillKey: string; threshold: number } };

const buildBoard = (): Tile[] => {
  const tiles: Tile[] = [];
  for (let i = 0; i < 30; i++) {
    let type: TileType = "LEARN";
    if (i === 0) type = "START";
    else if (i === 29) type = "FINISH";
    else if (i % 7 === 0) type = "CHALLENGE";
    else if (i % 5 === 0) type = "EVENT";
    else if (i % 11 === 0) type = "REST";

    const tile: Tile = { idx: i, type };
    if (type === "CHALLENGE") {
      const reqs = [
        { skillKey: "activeListening", threshold: 1 },
        { skillKey: "technical", threshold: 1 },
        { skillKey: "presentation", threshold: 1 },
        { skillKey: "jobCost", threshold: 1 },
        { skillKey: "empathy", threshold: 1 },
      ];
      tile.requirement = reqs[Math.floor(i / 7) % reqs.length];
      tile.label = `Challenge: ${SKILL_LABELS[tile.requirement.skillKey]}`;
    }
    tiles.push(tile);
  }
  return tiles;
};

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const rollD6 = () => Math.floor(Math.random() * 6) + 1;

type Player = {
  name: string;
  color: string;
  position: number;
  points: number;
  skipTurns: number;
  skills: Record<string, number>;
  isAI: boolean;
};

function makePlayer(name: string, color: string, isAI: boolean = false): Player {
  return {
    name,
    color,
    position: 0,
    points: 0,
    skipTurns: 0,
    skills: { selfAwareness: 0, activeListening: 0, empathy: 0, technical: 0, presentation: 0, jobCost: 0 },
    isAI,
  };
}

function randomColor() {
  const colors = ["#ef4444", "#3b82f6", "#10b981", "#a855f7", "#f59e0b", "#06b6d4"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function LeadershipToolboxGame() {
  const board = useMemo(() => buildBoard(), []);
  const [gameStarted, setGameStarted] = useState(false);
  const [deck, setDeck] = useState(() => shuffle(SAMPLE_CARDS));
  const [discard, setDiscard] = useState<any[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [current, setCurrent] = useState(0);
  const [rolled, setRolled] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState<any | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [cardQueue, setCardQueue] = useState<any[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const active = players[current];

  // Process card queue when it changes
  useEffect(() => {
    if (cardQueue.length > 0 && !currentCard) {
      const [nextCard, ...remaining] = cardQueue;
      setCardQueue(remaining);
      setCurrentCard(nextCard);
    }
  }, [cardQueue, currentCard]);

  // AI auto-play effect
  useEffect(() => {
    if (!gameStarted || !active || !active.isAI || currentCard || aiThinking || winner) return;
    
    setAiThinking(true);
    const timeout = setTimeout(() => {
      makeTurn();
    }, 1500); // AI thinks for 1.5 seconds
    
    return () => clearTimeout(timeout);
  }, [current, gameStarted, currentCard, winner]); // Removed aiThinking and active from deps to prevent loops

  function startGame(aiCount: number) {
    const newPlayers: Player[] = [
      makePlayer("You", "#ef4444", false),
    ];
    const aiNames = ["AI Leader", "AI Manager", "AI Director"];
    for (let i = 0; i < aiCount; i++) {
      newPlayers.push(makePlayer(aiNames[i], randomColor(), true));
    }
    // Reset all game state
    setPlayers(newPlayers);
    setGameStarted(true);
    setCurrent(0);
    setRolled(null);
    setCurrentCard(null);
    setAiThinking(false);
    setCardQueue([]);
    setWinner(null);
    setDeck(shuffle(SAMPLE_CARDS));
    setDiscard([]);
  }

  function makeTurn() {
    if (active.skipTurns > 0) {
      updatePlayer(current, (p) => ({ ...p, skipTurns: p.skipTurns - 1 }));
      nextTurn();
      return;
    }
    const n = rollD6();
    setRolled(n);
    movePlayer(current, n);
  }

  function drawCard(n = 1) {
    let d = [...deck];
    let drawn: any[] = [];
    for (let i = 0; i < n; i++) {
      if (d.length === 0) {
        d = shuffle(discard);
        setDiscard([]);
      }
      const c = d.shift();
      if (!c) break;
      drawn.push(c);
    }
    setDeck(d);
    return drawn;
  }

  function handleTileEffect(tile: Tile) {
    if (tile.type === "LEARN" || tile.type === "EVENT") {
      const [c] = drawCard(1);
      if (c) {
        setCurrentCard(c);
      } else {
        nextTurn();
      }
    } else if (tile.type === "CHALLENGE" && tile.requirement) {
      const { skillKey, threshold } = tile.requirement;
      const ok = (players[current].skills[skillKey] || 0) >= threshold;
      setCurrentCard({
        id: `challenge-${tile.idx}`,
        title: tile.label || "Challenge",
        category: "Challenge",
        body: ok ? `Success! You meet the threshold (${threshold}). +2 points.` : `Missed it. Need ${threshold} in ${SKILL_LABELS[skillKey]}. -1 point.`,
        effect: { type: "points", amount: ok ? 2 : -1 },
      });
    } else if (tile.type === "REST") {
      setCurrentCard({
        id: `rest-${tile.idx}`,
        title: "Reflection",
        category: "Well-being",
        body: "Take a breath. +1 Self Awareness.",
        effect: { type: "skill", skillKey: "selfAwareness", amount: 1 },
      });
    } else if (tile.type === "FINISH") {
      const playerPoints = players[current].points;
      const hasWon = playerPoints >= 15;
      
      if (hasWon) {
        setWinner(players[current].name);
        setAiThinking(false);
        setCurrentCard({
          id: "win",
          title: "🎉 Victory!",
          category: "Game Over",
          body: `${players[current].name} wins with ${playerPoints} points! Congratulations!`,
          effect: { type: "win" },
        });
      } else {
        setCurrentCard({
          id: "finish-no-win",
          title: "Not Quite...",
          category: "Milestone",
          body: `${players[current].name} reached the finish with only ${playerPoints} points. You need 15+ points to win. Keep playing!`,
          effect: { type: "continue" },
        });
      }
    } else {
      nextTurn();
    }
  }

  function handleCardClose() {
    const card = currentCard;
    if (!card) return;
    
    setCurrentCard(null);
    if (card.id && card.id !== "win" && card.id !== "challenge" && !card.id.startsWith("challenge-") && !card.id.startsWith("rest-") && !card.id.startsWith("finish-")) {
      setDiscard((d) => [card, ...d]);
    }
    applyEffect(card.effect);
  }

  function applyEffect(effect: any) {
    // Now currentCard is closed, read the LATEST cardQueue state
    switch (effect?.type) {
      case "points":
        updatePlayer(current, (p) => ({ ...p, points: p.points + (effect.amount || 0) }));
        // Check if there are more cards in queue before ending turn
        if (cardQueue.length === 0) {
          nextTurn();
        }
        break;
      case "skill":
        bumpSkill(current, effect.skillKey, effect.amount || 1);
        // Check if there are more cards in queue before ending turn
        if (cardQueue.length === 0) {
          nextTurn();
        }
        break;
      case "draw": {
        const cards = drawCard(effect.amount || 1);
        if (cards.length > 0) {
          // Append to existing queue (don't replace it)
          setCardQueue(prev => [...prev, ...cards]);
        } else if (cardQueue.length === 0) {
          nextTurn();
        }
        break;
      }
      case "move":
        movePlayer(current, effect.spaces || 0);
        break;
      case "skip":
        updatePlayer(current, (p) => ({ ...p, skipTurns: (p.skipTurns || 0) + (effect.turns || 1) }));
        if (cardQueue.length === 0) {
          nextTurn();
        }
        break;
      case "win":
        // Game over, don't call nextTurn
        break;
      case "continue":
        // Finish without winning, continue playing
        nextTurn();
        break;
      default:
        if (cardQueue.length === 0) {
          nextTurn();
        }
        break;
    }
  }

  function bumpSkill(idx: number, skillKey: string, by = 1) {
    updatePlayer(idx, (p) => ({
      ...p,
      skills: { ...p.skills, [skillKey]: (p.skills[skillKey] || 0) + by },
    }));
  }

  function updatePlayer(idx: number, fn: (p: Player) => Player) {
    setPlayers((ps) => ps.map((p, i) => (i === idx ? fn(p) : p)));
  }

  function movePlayer(idx: number, spaces: number) {
    setPlayers((ps) => {
      const p = ps[idx];
      const pos = Math.min(p.position + spaces, board.length - 1);
      const updated = { ...p, position: pos };
      const next = ps.map((pp, i) => (i === idx ? updated : pp));
      setTimeout(() => handleTileEffect(board[pos]), 10);
      return next;
    });
  }

  function nextTurn() {
    setRolled(null);
    setCurrentCard(null);
    setAiThinking(false); // Clear AI thinking state when turn ends
    setCurrent((c) => (c + 1) % players.length);
  }

  if (!gameStarted) {
    return <SetupScreen onStart={startGame} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4" data-testid="game-board">
      <header className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">Leadership Toolbox – Board Game</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setGameStarted(false)}
          data-testid="button-new-game"
        >
          New Game
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Board board={board} players={players} />
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2">Turn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {winner ? (
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">🎉 {winner} Wins!</p>
                  <Button onClick={() => setGameStarted(false)} size="sm">
                    Play Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ background: active?.color }} />
                    <span className="font-medium">{active?.name}</span>
                    {active?.isAI && aiThinking && (
                      <span className="text-xs text-muted-foreground ml-auto">Thinking...</span>
                    )}
                  </div>
                  {!active?.isAI && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Button onClick={makeTurn} size="sm" data-testid="button-roll">
                        Roll Dice
                      </Button>
                      {rolled && <span className="text-sm text-muted-foreground">Rolled: {rolled}</span>}
                    </div>
                  )}
                  {active?.isAI && (
                    <div className="text-sm text-muted-foreground">
                      {aiThinking ? "AI is thinking..." : rolled ? `Rolled: ${rolled}` : ""}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {players.map((p, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ background: p.color }} />
                      <span className="font-medium">{p.name}</span>
                      {p.isAI && <span className="text-xs text-muted-foreground">(AI)</span>}
                      <span className="ml-auto text-xs text-muted-foreground">Pos {p.position}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Points: {p.points} {p.skipTurns > 0 && <em>(skip {p.skipTurns})</em>}
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                      {Object.entries(p.skills).filter(([, v]) => v > 0).map(([k, v]) => (
                        <span key={k} className="px-2 py-0.5 rounded bg-muted">
                          {SKILL_LABELS[k] || k}: {v}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 text-base">How to Win</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <p>Reach the finish with <strong>15+ points</strong>. Earn points by passing challenges and drawing cards.</p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <AnimatePresence>
        {currentCard && (
          <Modal>
            <CardModal
              title={currentCard.title}
              category={currentCard.category}
              body={currentCard.body}
              onClose={handleCardClose}
              isAI={currentCard.id === "win" ? false : active?.isAI}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function SetupScreen({ onStart }: { onStart: (aiCount: number) => void }) {
  const [aiCount, setAiCount] = useState(1);

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">Leadership Toolbox Game</CardTitle>
          <CardDescription>Choose your opponents and start playing!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Number of AI Opponents</label>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((count) => (
                <Button
                  key={count}
                  variant={aiCount === count ? "default" : "outline"}
                  onClick={() => setAiCount(count)}
                  data-testid={`button-ai-${count}`}
                >
                  {count === 0 ? "Solo Practice" : `${count} AI ${count === 1 ? "Opponent" : "Opponents"}`}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Game Rules:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Roll the dice to move around the board (30 tiles)</li>
              <li>Land on LEARN or EVENT tiles to draw cards</li>
              <li>Pass CHALLENGE tiles by having the required skill level</li>
              <li>Earn points and build skills to reach the finish</li>
              <li>First to finish with 15+ points wins!</li>
            </ul>
          </div>

          <Button 
            onClick={() => onStart(aiCount)} 
            className="w-full"
            data-testid="button-start-game"
          >
            Start Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Board({ board, players }: { board: Tile[]; players: Player[] }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {board.map((t) => (
        <div
          key={t.idx}
          className={`relative border h-20 rounded flex items-center justify-center text-xs text-center ${tileBg(t.type)}`}
        >
          <div className="absolute top-1 left-1 text-[10px] text-muted-foreground">{t.idx}</div>
          <div className="px-1">
            <div className="font-medium">{t.type}</div>
            {t.label && <div className="text-[10px] text-muted-foreground mt-0.5">{t.label}</div>}
          </div>
          <div className="absolute bottom-1 right-1 flex gap-1">
            {players
              .filter((p) => p.position === t.idx)
              .map((p) => (
                <span
                  key={p.name}
                  className="w-3 h-3 rounded-full border"
                  style={{ background: p.color }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function tileBg(type: TileType) {
  switch (type) {
    case "START":
      return "bg-green-50 dark:bg-green-950";
    case "FINISH":
      return "bg-amber-50 dark:bg-amber-950";
    case "CHALLENGE":
      return "bg-red-50 dark:bg-red-950";
    case "EVENT":
      return "bg-sky-50 dark:bg-sky-950";
    case "REST":
      return "bg-purple-50 dark:bg-purple-950";
    default:
      return "bg-muted/30";
  }
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card rounded-lg shadow-xl w-[92vw] max-w-md p-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CardModal({
  title,
  category,
  body,
  onClose,
  isAI,
}: {
  title: string;
  category: string;
  body: string;
  onClose: () => void;
  isAI?: boolean;
}) {
  // Auto-close for AI players
  useEffect(() => {
    if (!isAI) return;
    const timeout = setTimeout(onClose, 2000); // AI auto-continues after 2 seconds
    return () => clearTimeout(timeout);
  }, [isAI, onClose]);

  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{category}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 flex justify-end">
        {!isAI && (
          <Button onClick={onClose} size="sm" data-testid="button-continue">
            Continue
          </Button>
        )}
        {isAI && (
          <span className="text-xs text-muted-foreground">AI continues in a moment...</span>
        )}
      </div>
    </div>
  );
}
