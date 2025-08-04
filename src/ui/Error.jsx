function Error() {
  return (
    <div className="m-auto flex h-dvh max-w-150 flex-col items-center justify-center px-10 pt-16 pb-10">
      <p className="">
        Couldn't fetch questions , try using another network 😢{" "}
      </p>
    </div>
  );
}

export default Error;
