// Examples
import CardCarouselExample from "./examples/example_one";
import CardCarouselExampleTwo from "./examples/example_two";
import CardCarouselExampleThree from "./examples/example_three";

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
