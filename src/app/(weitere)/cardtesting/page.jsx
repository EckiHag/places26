import { Card, CardBody, CardFooter, Button, Image, Text } from "@heroui/react";

export default async function TestCards() {
  return (
    <body class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="w-full max-w-[896px] bg-red-400 shadow-lg rounded-lg p-8">
        <h2 class="text-3xl font-bold text-gray-800">Größere Card</h2>
        <p class="text-gray-600 mt-2">Jetzt ist die Card deutlich breiter!</p>
        <button class="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Mehr erfahren</button>
      </div>
    </body>

    // #######################################

    // <body class="bg-gray-100 p-4">
    //   <div class="container mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-6">
    //     <h2 class="text-2xl font-bold text-gray-800">Responsive Card</h2>
    //     <p class="text-gray-600 mt-2">Diese Card wächst jetzt richtig mit.</p>
    //     <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Mehr erfahren</button>
    //   </div>
    // </body>

    // #######################################
    // <body class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    //   <div class="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-lg rounded-lg p-6">
    //     <h2 class="text-2xl font-bold text-gray-800">Responsive Card</h2>
    //     <p class="text-gray-600 mt-2">Diese Card hat eine **feste Breite auf großen Screens**, passt sich aber auf **kleineren Bildschirmen flexibel an**.</p>
    //     <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Mehr erfahren</button>
    //   </div>
    // </body>

    // #######################################
    // <div className="flex flex-row h-[calc(100dvh-80px)] gap-5 flex-wrap">
    //   {/* Card 1 */}
    //   <Card isHoverable isPressable className="bg-blue-200">
    //     <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
    //     <CardBody>
    //       <h1>Card Title 1</h1>
    //       <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
    //     </CardBody>
    //     <CardFooter>
    //       <Button as="div" className="bg-primary">
    //         More Info
    //       </Button>{" "}
    //       {/* Use as="div" to avoid nested buttons */}
    //     </CardFooter>
    //   </Card>

    //   {/* Card 2 */}
    //   <Card isHoverable isPressable>
    //     <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
    //     <CardBody>
    //       <h1>Card Title 2</h1>
    //       <h3>Quisque non nulla ac eros bibendum commodo.</h3>
    //     </CardBody>
    //     <CardFooter>
    //       <Button as="div" className="bg-success">
    //         Buy Now
    //       </Button>{" "}
    //       {/* Use as="div" to avoid nested buttons */}
    //     </CardFooter>
    //   </Card>

    //   {/* Card 3 */}
    //   <Card isHoverable isPressable>
    //     <Image src="https://via.placeholder.com/300x200" alt="Placeholder Image" objectfit="cover" height={200} />
    //     <CardBody>
    //       <h1>Card Title 3</h1>
    //       <h3>Donec et lacus eu augue fermentum suscipit.</h3>
    //     </CardBody>
    //     <CardFooter>
    //       <Button as="div" className="bg-error">
    //         Delete
    //       </Button>
    //       {/* Use as="div" to avoid nested buttons */}
    //     </CardFooter>
    //   </Card>
    // </div>
  );
}
