import { Card, CardBody, CardFooter, Button, Image, Text } from "@heroui/react";

export default async function TestCards() {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Card 1 */}
      <Card isHoverable isPressable>
        <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
        <CardBody>
          <h1>Card Title 1</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
        </CardBody>
        <CardFooter>
          <Button as="div" className="bg-primary">
            More Info
          </Button>{" "}
          {/* Use as="div" to avoid nested buttons */}
        </CardFooter>
      </Card>

      {/* Card 2 */}
      <Card isHoverable isPressable>
        <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
        <CardBody>
          <h1>Card Title 2</h1>
          <h3>Quisque non nulla ac eros bibendum commodo.</h3>
        </CardBody>
        <CardFooter>
          <Button as="div" className="bg-success">
            Buy Now
          </Button>{" "}
          {/* Use as="div" to avoid nested buttons */}
        </CardFooter>
      </Card>

      {/* Card 3 */}
      <Card isHoverable isPressable>
        <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
        <CardBody>
          <h1>Card Title 3</h1>
          <h3>Donec et lacus eu augue fermentum suscipit.</h3>
        </CardBody>
        <CardFooter>
          <Button as="div" className="bg-error">
            Delete
          </Button>
          {/* Use as="div" to avoid nested buttons */}
        </CardFooter>
      </Card>
    </div>
  );
}
