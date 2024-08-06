function Button() {
  const handleClick = () => console.log("OUCH!");

  function handleClick2(name) {
    console.log(`${name} stop clicking me`);
  }

  return (
    <button onClick={() => handleClick("juan")} className="button">
      Click Me
    </button>
  );
}

export default Button;
