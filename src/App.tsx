function App() {
  const a = [1, 23, 4, 5];
  return (
    <div>
      {a.map((elem) => (
        <li key={elem}>{elem}</li>
      ))}
    </div>
  );
}

export default App;
