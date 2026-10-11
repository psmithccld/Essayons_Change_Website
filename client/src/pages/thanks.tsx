export default function Thanks() {
  return (
    <div className="container py-20 max-w-2xl text-center">
      <h1 className="text-4xl font-bold mb-4" data-testid="text-thanks-title">
        Thank You
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Essayons Change appreciates your purchase.
      </p>

      <div className="prose prose-slate max-w-none mx-auto space-y-4">
        <p>Your purchase is live and active. You can use the AI features now.</p>
        <p>To see your updated token balance, restart the 11-Row Plan app.</p>
      </div>

      <div className="mt-10">
        <a
          href="https://www.essayonschange.com"
          className="text-primary hover:underline"
          data-testid="link-thanks-home"
        >
          Return to essayonschange.com
        </a>
      </div>
    </div>
  );
}
