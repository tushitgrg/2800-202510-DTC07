export default async function Page({ params }) {
  const { id } = await params;

  const tempData = {
    "1": {
      title: "1712 Module 1",
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac vestibulum tortor, ac elementum velit.
Maecenas iaculis massa dolor, a vestibulum justo iaculis sed. Proin augue leo, aliquam mollis convallis quis, pellentesque eget purus.
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In ut luctus ante. Maecenas sed neque justo.
Aenean finibus mi a odio laoreet aliquet. Suspendisse molestie dolor diam, a lacinia purus dapibus eget. Vestibulum non ante id mi feugiat luctus.
Nam iaculis arcu id luctus sodales. Vivamus malesuada enim nec libero sollicitudin dictum. Aliquam odio sem, auctor in elementum sed, fermentum quis libero.
Donec in malesuada diam. Nulla dui urna, molestie eu gravida ut, rutrum id metus. Fusce luctus tellus sed ipsum semper, ac dapibus lacus facilisis. 
Praesent sollicitudin ligula velit.
`,
      date: "2025-05-02",
      tag: "COMP 1712",
    },
    "2": {
      title: "1712 Module 2",
      description: (<>
        <h1 className="text-3xl font-bold mb-2 text-center">Chapter 1:</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac
          vestibulum tortor, ac elementum velit. Sed nibh purus, congue vel nunc sit amet, volutpat tempus eros.
          Praesent at dui vitae velit condimentum faucibus.
          In ut luctus ante. Maecenas sed neque justo.
          Aenean finibus mi a odio laoreet aliquet. Suspendisse molestie dolor diam, a lacinia purus dapibus eget. Vestibulum non ante id mi feugiat luctus.
          Nam iaculis arcu id luctus sodales. Vivamus malesuada enim nec libero sollicitudin dictum. Aliquam odio sem, auctor in elementum sed, fermentum quis libero.
        </p>
        <h1 className="text-3xl font-bold my-2 text-center">Chapter 2:</h1>
        <p>
          Sed nibh purus, congue vel nunc sit amet, volutpat tempus eros. Praesent at dui vitae velit condimentum faucibus.
          Nullam gravida nisl sed quam porta, sed hendrerit dui dictum. Curabitur imperdiet dapibus nulla, quis faucibus magna vestibulum ac.
          Suspendisse vel mattis ex. Mauris volutpat sagittis nisi in varius. Curabitur purus mauris, tempor feugiat mauris vitae, gravida ullamcorper nibh.
          Fusce lobortis, ante at sagittis condimentum, sapien est fermentum elit, quis fringilla tellus augue ut libero.
          Aenean auctor tempor sapien vitae condimentum. Mauris sagittis dapibus neque, et elementum quam dignissim vel.
          Aliquam blandit viverra lacus nec scelerisque. Ut quis tellus tempus, aliquam elit vitae, bibendum sem. Proin nec hendrerit eros.
          Sed lorem elit, pulvinar eu mauris at, mollis suscipit nulla. Nullam ut quam ligula. Sed risus tellus, aliquet non enim quis, finibus maximus tellus.
        </p>
      </>),
      date: "2025-05-03",
      tag: "COMP 1712",
    },
    "3": {
      title: "1712 Module 3",
      description: (
        <>
          <h1 className="text-3xl font-bold mb-2 text-center">Chapter 1:</h1>
          <ul className="list-disc list-inside space-y-1 mb-6 ">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Etiam ac vestibulum tortor, ac elementum velit.</li>
            <li>Maecenas iaculis massa dolor, a vestibulum justo iaculis sed.</li>
            <li>Proin augue leo, aliquam mollis convallis quis, pellentesque eget purus.</li>
          </ul>

          <h1 className="text-3xl font-bold mb-2 text-center">Chapter 2:</h1>
          <ul className="list-disc list-inside space-y-1">
            <li>Sed nibh purus, congue vel nunc sit amet, volutpat tempus eros.</li>
            <li>Praesent at dui vitae velit condimentum faucibus.</li>
            <li>Nullam gravida nisl sed quam porta, sed hendrerit dui dictum.</li>
          </ul>
        </>
      ),
      date: "2025-05-04",
      tag: "COMP 1712",
    },
  };

  const data = tempData[id]

  const note = {
    ...data,
    date: new Date(data.date),
  };

  return <SummaryPage params={{ note }} />;
}