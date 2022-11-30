import SearchBar from "../components/SearchBar"
import '../styles/search.css'

function Search() {
  return (
    <div className="search-container">
      <h3 className = 'search-header'>Search for a book</h3>
        <SearchBar/>
    </div>
  )
}

export default Search
