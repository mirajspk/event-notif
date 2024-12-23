
const Title = [
  'Apple', 'Banana', 'Cat', 'Dog', 'Elephant', 'Fish', 'Giraffe', 'Horse', 'Ice-cream', 'Jelly', 'Kite', 'Lion', 'Mango', 'Nest', 'Owl', 'Parrot', 'Queen', 'Rat', 'Sun', 'Tiger', 'Umbrella', 'Van', 'Watch', 'Xylophone', 'Yak', 'Zebra'
]
const SearchBarLists = () => {
  const list = Title.map(item => (
    <li className="hover:bg-[#efefef]">{item}</li>
  ))

  return (
    <div>
      <div className="absolute flex flex-col gap-4 mt-5 shadow-[0px 0px 8px #ddd] rounded-lg max-h-[300px] overflow-y-auto m-4 w-[99%] pt-2 bg-white  pr-4 z-10">
        <ul>{list}</ul>
      </div>
    </div >
  )
}

export default SearchBarLists
