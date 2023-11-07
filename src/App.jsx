function App() {
    return (
        <>
            <header style={{ background: "blue", height: "136px" }}></header>
            <div id="main-content">
                <div className="header">
                    <h1 className="heading">Find My Professor</h1>
                    <h2 className="subheading">
                        Search professor by <span className="bold">name</span>,{" "}
                        <span className="bold">email</span>,{" "}
                        <span className="bold">course ID</span>,{" "}
                        <span className="bold">Course Title</span> or{" "}
                        <span className="bold">Section number</span>.
                    </h2>
                    <div className="search-input-container">
                        <div className="input-field">
                            <img src="./search.svg" alt="magnifying glass" />
                            <input type="text" placeholder="Search here..." />
                        </div>
                        <button>
                            <img src="./button-search.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
