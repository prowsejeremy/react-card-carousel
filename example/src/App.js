import CardCarouselExample from "./__example";
import CardCarouselExampleTwo from "./__exampleTwo";
import CardCarouselExampleThree from "./__exampleThree";

function App() {
  return (
    <div className="App">
      <div className="exampleSection">
        <h1>React Card Carousel</h1>
      </div>
      <CardCarouselExample />

      <CardCarouselExampleTwo />
      <CardCarouselExampleThree />
    </div>
  );
}

export default App;
