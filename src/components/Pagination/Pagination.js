import React, {useState} from "react";
import "./Pagination.scss"


function* range(start, end) {
    while (start < end) {
        yield start;
        start += 1;
    }
}

//#region Button paginate
const FirstBtn = props => (
    <button type={"button"} {...props}>
        <span> <i className="mdi mdi-page-first"/></span>
    </button>
)
const PrevBtn = props => (
    <button type={"button"} {...props}>
        <span> <i className="mdi mdi-chevron-double-left"/></span>
    </button>
)
const NextBtn = props => (
    <button type={"button"} {...props}>
        <span> <i className="mdi mdi-chevron-double-right"/></span>
    </button>
)
const Ellipsis = () => (
    <span style={{padding:"5px"}}>
            <i className="mdi mdi-dots-horizontal"/>
    </span>
)
const LastBtn = props => (
    <button type={"button"} {...props}>
        <span> <i className="mdi mdi-page-last"/></span>
    </button>
)
//#endregion

const ButtonType = {CIRCLE: "circle", SQUARE: "square"}

const Pagination = ({
                        page,
                        activePage: initialActivePage,
                        handleChangePage,
                        handlePageSize,
                        style = {btnType: ButtonType.SQUARE},
                        totalCount = 0
                    }) => {


    const [activePage, setActivePage] = useState(initialActivePage);
    const [pageSize, setPageSize] = useState(10)
    // const [getToggle, setToggle] = useState(false)
    // const handleToggle = () => {
    //     setToggle(!getToggle)
    // }

    //#region handle change page size
    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value))
        handlePageSize(parseInt(event.target.value));

    }
    //#endregion

    //#region generate number button
    const generatePages = () => {
        if (page <= 6) {
            const pages = Array.from(range(1, page + 1));
            return pages.map(page => (
                <button
                    type="button"
                    key={`btn-page-${page}`}
                    className={page === activePage ? "is-active" : ""}
                    onClick={e => {
                        e.target.focus();
                        setActivePage(page);
                        handleChangePage(page)
                    }}
                >
                    {page}
                </button>
            ));
        }
        if (page - activePage <= 4) {
            const first = Array.from(range(page - 4, page + 1));

            return (
                <>
                    <Ellipsis/>
                    {first.map((page, i) => (
                        <button key={i}
                                type="button"
                                className={page === activePage ? "is-active" : ""}
                                onClick={e => {
                                    e.target.focus();
                                    setActivePage(page);
                                    handleChangePage(page)
                                }}
                        >
                            {page}
                        </button>
                    ))}
                </>
            );
        } else {
            const first =
                activePage === 1
                    ? Array.from(range(activePage, activePage + 3))
                    : Array.from(range(activePage - 1, activePage + 2));
            const end = Array.from(range(page - 1, page + 1));

            return (
                <>
                    {first.map((page, i) => (
                        <button key={i}
                                type="button"
                                className={page === activePage ? "is-active" : ""}
                                onClick={e => {
                                    e.target.focus();
                                    setActivePage(page);
                                    handleChangePage(page)
                                }}
                        >
                            {page}
                        </button>
                    ))}
                    <Ellipsis/>
                    {end.map((page, i) => (
                        <button key={i}
                                type="button"
                                className={page === activePage ? "is-active" : ""}
                                onClick={e => {
                                    e.target.focus();
                                    setActivePage(page);
                                    handleChangePage(page)
                                }}
                        >
                            {page}
                        </button>
                    ))}
                </>
            );
        }
    };
    //#endregion

    //#region Render first button
    const renderFirstButton = () => <section
        className={`${style.btnType === ButtonType.CIRCLE ? "btn-page" : "btn-page square"} btn-page-first`}>
        <FirstBtn
            disabled={activePage === 1}
            onClick={() => {
                setActivePage(1);
                handleChangePage(1);
            }}
        />
    </section>
    //#endregion

    //#region Render prev button
    const renderPrevButton = () => <section
        className={`${style.btnType === ButtonType.CIRCLE ? "btn-page" : "btn-page square"} btn-page--prev`}>
        <PrevBtn
            disabled={activePage === 1}
            onClick={() => {
                setActivePage(activePage - 1)
                handleChangePage(activePage - 1)
            }}
        />
    </section>
    //#endregion

    //#region Render number button
    const renderNumbersButton = () => <section
        className={`${style.btnType === ButtonType.CIRCLE ? "btn-page" : "btn-page square"} btn-page--numbers`}>
        {generatePages()}
    </section>
    //#endregion

    //#region Render next button
    const renderNextButton = () => <section
        className={`${style.btnType === ButtonType.CIRCLE ? "btn-page" : "btn-page square"} btn-page--next`}>
        <NextBtn
            disabled={activePage === page || page === 0}
            onClick={() => {
                setActivePage(activePage + 1)
                handleChangePage(activePage + 1)
            }}
        />
    </section>
    //#endregion

    //#region last button
    const renderLastButton = () => <section
        className={`${style.btnType === ButtonType.CIRCLE ? "btn-page" : "btn-page square"} btn-page-last`}>
        <LastBtn
            disabled={activePage === page || page === 0}
            onClick={() => {
                setActivePage(page);
                handleChangePage(page);
            }}
        />
    </section>
    //#endregion

    //#region page size
    const renderPageSize = () => <section className="input-page-size">
        <select value={pageSize} name="pageSize" id=""
                onChange={handleChangePageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    </section>
    //#endregion
    //#region Render total count
    const renderTotalCount = () =>
        <section className="paginate-total-count">
            <span>تعدادرکوردها : </span>&nbsp;<span>{totalCount}</span>
        </section>
    //#endregion

    return (
        <div className="infinite-pagination">
            <div className="pagination">
                {renderFirstButton()}
                {renderPrevButton()}
                {renderNumbersButton()}
                {renderNextButton()}
                {renderLastButton()}
                {renderPageSize()}
                {renderTotalCount()}
            </div>
            {/*<div className="hamburger-menu-animate-icon">*/}
            {/*    <button className="btn-page" onClick={handleToggle}>*/}
            {/*        <div className="hamburger">*/}
            {/*            <span className="line"/>*/}
            {/*            <span className="line"/>*/}
            {/*            <span className="line"/>*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>

    );
};

export default Pagination;
