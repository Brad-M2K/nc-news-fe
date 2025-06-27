


function SortControls({ sortBy, setSortBy, order, setOrder}) {



    return (
        <div className="sort-controls">
            <select
                className="sort-dropdown"
                id="sort-select"
                value={sortBy || ""}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">SORT BY</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
            </select>
            <select
                className="sort-dropdown"
                id="order-select"
                value={order || ""}
                onChange={(e) => setOrder(e.target.value)}
            >
                <option value="">ORDER</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )

}

export default SortControls;