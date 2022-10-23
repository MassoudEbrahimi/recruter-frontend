import React, {useEffect, useState} from "react";
import "./Pagination.scss";

function* range(start, end) {
    while (start < end) {
        yield start;
        start += 1;
    }
}

//#region Buttons
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
    <span style={{padding: "5px"}}>
            <i className="mdi mdi-dots-horizontal"/>
    </span>
)
const LastBtn = props => (
    <button type={"button"} {...props}>
        <span> <i className="mdi mdi-page-last"/></span>
    </button>
)
const pageQuantity = (total, pageSize) => {
    return Number(Math.ceil(total / pageSize))
}
//#endregion
const BUTTON_TYPE = {circle: "circle", square: "square"};

const Pagination = ({
                        size = 10,
                        current = 1,
                        changePageSize = () => {
                        },
                        changeCurrentPage = () => {
                        },
                        style = {type: BUTTON_TYPE.square},
                        totalCount = 0
                    }) => {

    //**************** State ***********************
    const [currentPage, setCurrentPage] = useState(current);
    const [pageSize, setPageSize] = useState(size);
    const [pageCount, setPageCount] = useState(pageQuantity(totalCount, size));


    useEffect(()=>{
        setPageCount(pageQuantity(totalCount, size))
    },[totalCount])

    //*************** Event Handler ****************
    const handleChangePageSize = async event => {
        const newPageSize = parseInt(event.target.value)
        setPageSize(newPageSize);
        setPageCount(pageQuantity(totalCount, newPageSize))
        await changePageSize(newPageSize)
    }
    const handleChangeCurrentPage = async (page, event) => {
        event.target.focus();
        setCurrentPage(page);
        await changeCurrentPage(page)
    }
    //*********************************************

    // *********** function ***********************
    const generatePages = () => {
        if (pageCount <= 6) {
            const pages = Array.from(range(1, pageCount + 1));
            return pages.map(p => (
                <button
                    type="button"
                    key={`btn-page-${p}`}
                    className={p === currentPage ? "is-active" : ""}
                    onClick={handleChangeCurrentPage.bind(this, p)}>
                    {p}
                </button>
            ));
        }
        if (pageCount - currentPage <= 4) {
            const first = Array.from(range(pageCount - 4, pageCount + 1));
            return (
                <>
                    <Ellipsis/>
                    {first.map((pageCount, i) => (
                        <button key={i}
                                type="button"
                                className={pageCount === currentPage ? "is-active" : ""}
                                onClick={handleChangeCurrentPage.bind(this, pageCount)}>
                            {pageCount}
                        </button>
                    ))}
                </>
            );
        } else {
            const first =
                currentPage === 1
                    ? Array.from(range(currentPage, currentPage + 3))
                    : Array.from(range(currentPage - 1, currentPage + 2));
            const end = Array.from(range(pageCount - 1, pageCount + 1));

            return (
                <>
                    {first.map((pageCount, i) => (
                        <button key={i}
                                type="button"
                                className={pageCount === currentPage ? "is-active" : ""}
                                onClick={handleChangeCurrentPage.bind(this, pageCount)}
                        >
                            {pageCount}
                        </button>
                    ))}
                    <Ellipsis/>
                    {end.map((pageCount, i) => (
                        <button key={i}
                                type="button"
                                className={pageCount === currentPage ? "is-active" : ""}
                                onClick={handleChangeCurrentPage.bind(this, pageCount)}
                        >
                            {pageCount}
                        </button>
                    ))}
                </>
            );
        }
    };
    //*********************************************

    //#region Render first button
    const renderFirstButton = () => <section
        className={`${style.type === BUTTON_TYPE.CIRCLE ? "btn-page" : "btn-page square"} btn-page-first`}>
        <FirstBtn
            disabled={currentPage === 1}
            onClick={handleChangeCurrentPage.bind(this, 1)}
        />
    </section>
    //#endregion
    //#region Render prev button
    const renderPrevButton = () => <section
        className={`${style.type === BUTTON_TYPE.CIRCLE ? "btn-page" : "btn-page square"} btn-page--prev`}>
        <PrevBtn
            disabled={currentPage === 1}
            onClick={handleChangeCurrentPage.bind(this, currentPage - 1)}
        />
    </section>
    //#endregion
    //#region Render number button
    const renderNumbersButton = () => <section
        className={`${style.type === BUTTON_TYPE.CIRCLE ? "btn-page" : "btn-page square"} btn-page--numbers`}>
        {generatePages()}
    </section>
    //#endregion
    //#region Render next button
    const renderNextButton = () => <section
        className={`${style.type === BUTTON_TYPE.CIRCLE ? "btn-page" : "btn-page square"} btn-page--next`}>
        <NextBtn
            disabled={currentPage === pageCount || pageCount === 0}
            onClick={handleChangeCurrentPage.bind(this, currentPage + 1)}
        />
    </section>
    //#endregion
    //#region Render last button
    const renderLastButton = () => <section
        className={`${style.type === BUTTON_TYPE.CIRCLE ? "btn-page" : "btn-page square"} btn-page-last`}>
        <LastBtn
            disabled={currentPage === pageCount || pageCount === 0}
            onClick={handleChangeCurrentPage.bind(this, pageCount)}
        />
    </section>
    //#endregion
    //#region Render page size
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
        <>
            <div className="infinite-pagination">
                <div className="pagination">
                    {renderTotalCount()}
                    {renderFirstButton()}
                    {renderPrevButton()}
                    {renderNumbersButton()}
                    {renderNextButton()}
                    {renderLastButton()}
                    {renderPageSize()}
                </div>
            </div>
            {/*<div>*/}
            {/*    <div className="mt-5">*/}
            {/*        <span>pageSize : {pageSize}</span>&nbsp;<br/>*/}
            {/*        <span>currentPage : {currentPage}</span>&nbsp;<br/>*/}
            {/*        <span>pageCount : {pageCount}</span><br/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
export default Pagination
