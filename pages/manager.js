
export default function Manager() {
  return (
        <>
         Hello there from Manager
        </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/hello`)
  const data = await res.json()
console.log(data);
  // Pass data to the page via props
  return { props: { data } }
}