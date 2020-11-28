const Bookmarks = ({bookMarkCities, setCity}) => {

const bookmarks = bookMarkCities.map((bookmark, index)=>{
    return(
        <div style={{transition: 0.3}} onClick={()=>{setCity(bookmark)}} key={index} className="bookmarkSelf">
            {bookmark}
        </div>
    )
})

    return ( 
        <div className="bookmarksSection">
            {bookmarks}
        </div>
     );
}
 
export default Bookmarks;