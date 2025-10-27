const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="text-muted-foreground rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Tenant Dashboard Starter
        </span>
        <h1 className="text-3xl font-semibold md:text-4xl">Build your next dashboard faster.</h1>
        <p className="text-muted-foreground">
          This template ships with a client-side tenant session, React Query hooks, and mock data so
          you can prototype UI flows without provisioning any backend services.
        </p>
        <p className="text-muted-foreground text-sm">
          Sign in with the demo tenant to explore the dashboard or wire in your own data sources
          when you are ready.
        </p>
      </div>
    </main>
  );
};

export default Home;
