export const NoMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="mb-6">
        <svg
          width={80}
          height={80}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z"
            fill="#F3F4F6"
          />
          <path
            d="M55 45C55 45.8841 54.6488 46.7319 54.0237 47.357C53.3986 47.9821 52.5507 48.3333 51.6667 48.3333H31.6667L25 55V28.3333C25 27.4493 25.3512 26.6014 25.9763 25.9763C26.6014 25.3512 27.4493 25 28.3333 25H51.6667C52.5507 25 53.3986 25.3512 54.0237 25.9763C54.6488 26.6014 55 27.4493 55 28.3333V45Z"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="text-lg text-foreground font-semibold">Your Messages</h1>
      <p className="text-sm mt-2 max-w-100 w-full mx-auto font-normal text-center">
        Select a conversation from the list to view messages or start a new
        conversation with exhibitors.
      </p>
    </div>
  );
};
