/* ****** library ***** */
import React, {Fragment, useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
/* ****** css ****** */
import "./Grid.scss";
/* ***** components ****** */
import Pagination from "./Pagination";
import {EmptyData} from "../EmptyData/EmptyData";
import { EnumManager } from "../../helpers";
import Loading from "../loading/loading";
/* ****** constants ****** */
/* ****** utilities ****** */


const list = [
    {
        id: 0, icon: "mdi mdi-magnify", eventHandler: () => {
        }, text: ""
    },
    {
        id: 1, icon: "mdi mdi-magnify", eventHandler: () => {
        }, text: ""
    },
]
const initActions = {enable: false, items: []};
const initFiltering = {enable: false, type: "inner"}; //inner,outer
const initRow = {
    enable: false, isMulti: false, eventHandler: () => {
    }
} // single - multi
const initRowDetails = {
    enable: false, eventHandler: () => {
    }
}
const initReloaded = {
    state: false, event: () => {
    }
};
const initialPaginate = {enable: true, pageSize: 10}
const Grid = React.forwardRef(({
                                   gridId = null,
                                   actions = {...initActions},
                                   dataColumns = [],
                                   dataSource = null,
                                   filtering = {...initFiltering},
                                   api = () => {},
                                   rowDetail = {initRowDetails},
                                   rowIndex = {...initRow},
                                   paginate = {...initialPaginate},
                                   dataCounts = 0,
                                   isOnLoad = false,
                                   reloaded = {...initReloaded},
                                   dataSourceIsNullText="دیتا برای نمایش وجود ندارد"
                               } ,  ref) => {
    const paginateDefaultProps = {...initialPaginate, paginate};
    const [data, setData] = useState(dataSource || null);
    const [pageSize, setPageSize] = useState(paginateDefaultProps.pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [columns, setColumns] = useState(createColumns(dataColumns));
    const [selectRows, setSelectRows] = useState(rowIndex.isMulti ? [] : null);
    const [loading, setLoading] = useState(false);
    const [dataLength, setDataLength] = useState(dataCounts || 0);


    const OPERATION_BTN_LENGTH = actions.enable ? (actions.items.length * 25) + 80 + "px" : "80px";

    useEffect( () => {
        if (isOnLoad){
            loadByQuery();
        }
    }, [])

    useEffect(() => {
        setData(dataSource);
    }, [dataSource])

    const reload = async () => {
        await reloaded.event();
        await loadByQuery();
    }

    /* ************* Columns ********************** */
    function createColumns(column) {
        return column.map(o => ({
            showTitle: o.showTitle,
            title: o.title,
            filterType: 3,
            filterText: '',
            type: o.type,
            sorting: o.sorting,
            filtering: o.filtering,
            sort: {show: false, desc: false},
            search: false,
            select: false,
        }))
    }

    /* ************* Request To BackEnd *********** */
    const loadByQuery = async (size = pageSize, current = currentPage, cb) => {
        //Todo Uncomment after connect to backend
        const result = await api(size, current, columns);
        await cb && cb();
        setData(result.items);
        setDataLength(result.totalCount);
    }
    /* ************* Pagination **************** */
    const handleChangePageSize = async page => {
        setPageSize(page)
        await loadByQuery(page, currentPage);

    }
    const handleChangeCurrentPage = async page => {
        setCurrentPage(page)
        await loadByQuery(pageSize, page);
    }
    /* ************* Select Row or Rows Function */
    const handleSelectRow = (row, index, e) => {
        if (rowIndex.isMulti) {
            const isUnSelect = selectRows.some(o => o === index)
            if (isUnSelect) {
                const unSelect = selectRows.filter(o => o !== index)
                // data = [...unSelect]
                setSelectRows(prev => [...unSelect]);
            } else {
                setSelectRows(prev => {
                    // data = [...prev, index];
                    return [...prev, index]
                });
            }

        } else {
            // data = index;
            setSelectRows(prev => index);
        }
        rowIndex.eventHandler(row)
    }
    const handleManageRow = (row, index, e) => {
        rowDetail.eventHandler({row, index, e})
    }
    /* ************* Sort   Function************/
    const handleSort = async i => {
        const cols = [...columns];
        if (!cols[i].sort.show) {
            cols.forEach(o => {
                o.sort.show = false;
                o.sort.desc = false;
            });
            cols[i].sort.show = true;
        } else if (cols[i].sort.show && cols[i].sort.desc) {
            cols.forEach(o => {
                o.sort.show = false;
                o.sort.desc = false;
            });
        } else if (cols[i].sort.show === true) {
            cols[i].sort.desc = true
        }
        setColumns([...cols]);
        await loadByQuery();
    }
    /* ************* Filter Inner Function *****/
    const handleSearchShow = i => {
        const cols = [...columns];
        cols[i].search = !cols[i].search;
        cols[i].filterText = ""
        setColumns([...cols])
    }
    const handleShowFilter = i=>{
        const cols = [...columns];
        cols[i].search = !cols[i].search;
        setColumns([...cols])
    }
    /* ************* Filter Function************/
    const changeFilterType = (i, e) => {
        const cols = [...columns];
        columns[i].filterType = Number(e.target.value);
        setColumns([...cols]);
    }
    const changeFilterText = (i, e) => {
        const cols = [...columns];
        cols[i].filterText = e.target.value;
        setColumns([...cols]);
    }
    const sendFilter = async (i, e) => {
        const cols = [...columns];
        cols[i].search = false;
        setCurrentPage(1);
        await loadByQuery();
        setColumns([...cols]);
    }
    const clearFilter = async (i, e) => {
        const cols = [...columns];
        cols[i].filterText = '';
        cols[i].filterType = 3;
        setColumns([...cols]);
        setCurrentPage(1);
        await loadByQuery();
    }
    const removeAllFilters = async () => {
        let cols = [...columns];
        cols = cols.map(o => ({
            ...o,
            filterText: "",
            filterType: 3
        }))
        setColumns(cols);
        setCurrentPage(1);
        await loadByQuery();
    }
    /* *************** Styles *******************/
    const getTemplateColumns = () => {
        let str = "90px 90px";
        columns.forEach(column => str += "200px");
        return str;
    }
    const getTemplateRows = () => {
        let str = '85px 85px';
        columns.forEach(o => {
            str += '40px '
        });
        return str;
    }
    const gridStyle = {
        direction: "rtl",
        gridTemplateColumns: getTemplateColumns(),
        gridTemplateRows: getTemplateRows()
    }
    /* *********** Render Filter Outer Grid *********/
    const renderFilterType = (o, i) => <select defaultValue={o.filterType} className="browser-default"
                                               onChange={changeFilterType.bind(this, i)}>
        <option value="1">برابر است با</option>
        <option value="2">برابر نیست با</option>
        <option value="3">شامل</option>
        <option value="4">شامل نمیشود</option>
    </select>
    const renderFilterOuterBtn = (o, i) =>
        <>
            <button type="button" onClick={sendFilter.bind(this, i)}>
                                <span className="icon">
                                    <i className="mdi mdi-filter"/>
                                </span>
            </button>
            <button type="button" onClick={clearFilter.bind(this, i)}>
                                <span className="icon">
                                    <i className="mdi mdi-eraser"/>
                                </span>
            </button>
        </>

    const renderFilters = () => {
        const cols = columns.map((o, i) =>
            <div className="grid-cell" key={i}>
                <div className="filter-area">
                    <input placeholder="جستجو ..." value={o.filterText} autoComplete="off"  onChange={changeFilterText.bind(this, i)}/>
                    <div style={{display: 'flex'}}>
                        {renderFilterOuterBtn(o, i)}
                        {renderFilterType(o, i)}
                    </div>
                </div>
            </div>
        )
        return (
            <div className="a-grid-outer-filter">
                <div className="grid-cell thin" style={{minWidth: OPERATION_BTN_LENGTH}}>
                    <button type="button" onClick={removeAllFilters}>
                        <span className="icon">
                            <i className="mdi mdi-eraser"/>
                        </span>
                    </button>
                </div>
                {actions.enable && <div className="grid-cell thin"/>}
                {cols}
            </div>
        )
    }
    /* *********** Render Filter Inner Grid *********/
    const renderInnerFilter = (o, i) => {
        const styles = {fontSize: 14, cursor: "pointer", margin: "0 10px"}
        return (
            <div className="inner-filter">
                {o.filterText === "" &&  <span style={styles} onClick={handleSearchShow.bind(this, i)}>
                        <i className="mdi mdi-magnify" aria-hidden="true"/>
                    </span>}
                {o.filterText !== "" &&
                <>
                    <span style={styles} onClick={handleShowFilter.bind(this, i)}>
                    <i className="mdi mdi-filter" aria-hidden="true"/>
                </span>
                    <span className="icon" style={styles} onClick={clearFilter.bind(this, i)}>
                    <i className="mdi mdi-eraser"/>
                        </span>
                </>
                }
                <div className={o.search ? "filter-triangle active" : "filter-triangle"}/>
                <div className={o.search ? "inner-filter-container active" : "inner-filter-container"}>
                    <input id={`submitFilter-${i}`} placeholder="جستجو ..." value={o.filterText} autoComplete={"false"}
                           onChange={changeFilterText.bind(this, i)}/>
                    <button id="submitBtn_filter" className="submit-filter"
                            onClick={sendFilter.bind(this, i)}>
                        <span><i className="mdi mdi-magnify"/></span>
                    </button>
                </div>
            </div>
        )
    }
    /* *********** Render Action ********************/
    const createActions = (row, index) => {
        return (
            <div className="grid-cell thin" style={{minWidth: OPERATION_BTN_LENGTH}}>
                <div className="a-grid-actions">
                    {actions.items.map((btn, i) => {
                        return (
                            <Fragment key={i}>
                                <button onClick={btn.eventHandler.bind(this, row, index)}
                                        style={{backgroundColor: btn.color || "#132743"}}>
                                    <span><i className={btn.icon}/></span>
                                    <span>{btn.text}</span>
                                </button>
                                &nbsp;
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        )
    }
    /* *********** Render Sort   ********************/
    const renderSort = (o, i, sortIcon) => <div className="a-grid-columns-action" key={i}>
        {o.sorting && <div className="grid-sort" onClick={handleSort.bind(this, i)} key={i}>
            {o.sort.show && !o.sort.desc ?
                (<span style={{fontSize: 20}}> <i className={sortIcon.ascend}/> </span>) :
                o.sort.show && o.sort.desc ?
                    (<span style={{fontSize: 20}}> <i className={sortIcon.descend}/> </span>) : (
                        <span style={{fontSize: 20}}><i className="mdi mdi-sort"
                                                        aria-hidden="true"/></span>)}
        </div>}

    </div>
    /* *********** Render Columns *******************/
    const renderColumns = () => {
        const cols = columns.map((o, i) => {
            const sortIcon = EnumManager.SortIcon(o.type);
            const sort_filter = o.sorting || (filtering.enable && filtering.type === "inner");
            return (
                <div className={"grid-cell"}
                    // style={{justifyContent: sort_filter ? "space-around" : "center"}}
                     style={{justifyContent : "start"}}
                     key={i}>
                    <div>
                        {o.showTitle}
                    </div>
                    <div className="a-grid-columns-action">
                        {o.sorting && renderSort(o, i, sortIcon)}
                        {(((filtering.enable && filtering.type === "inner") && o.filtering) && Array.isArray(data)) && renderInnerFilter(o, i)}
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
                <div className="a-grid-columns">
                    {actions.enable &&
                    <div className="grid-cell thin" style={{minWidth: OPERATION_BTN_LENGTH}}>عملیات
                    </div>}
                    <div className="grid-cell thin">ردیف</div>
                    {cols}
                    {/*<div className="scroll-row"/>*/}
                </div>
            </Fragment>
        )
    }
    /* *********** Render Rows   *******************/
    const renderRow = (row, index, rowsIndexes) => {
        const rows = columns.map((o, i) => {
            return (
                <div key={i} className="grid-cell grid-cell-text" title={row[o.title]}>
                    {/*<div className="grid-cell-text">*/}
                    <span>
                        {row[o.title]}
                        </span>
                    {/*</div>*/}

                </div>
            )
        })

        return (
            <>
                {actions.enable && createActions(row, rowsIndexes)}
                <div className="grid-cell thin" style={{padding: "8px 15px"}}>{rowsIndexes}</div>
                {rows}
            </>
        )
    }
    const renderRowWrapper = (row, index) => {
        const gridRowIndex = ((pageSize * (currentPage - 1)) + index + 1)
        let rowHighlighted = null;
        if (rowIndex.isMulti) rowHighlighted = selectRows.find(o => o === gridRowIndex)
        else rowHighlighted = selectRows
        const evenOdd = index % 2 === 0 ? "odd-rows" : "even-rows";
        return (
            <div
                className={rowHighlighted === gridRowIndex ? `a-grid-row select-row ${evenOdd}` : `a-grid-row ${evenOdd}`}
                key={index}
                onClick={rowIndex.enable ?
                    handleSelectRow.bind(this, row, gridRowIndex) :
                    rowDetail.enable ?handleManageRow.bind(this, row, gridRowIndex) : null}>
                {renderRow(row, index, gridRowIndex)}
            </div>
        )
    }
    const renderRows = () => {
        return data.map((o, i) => {
            return renderRowWrapper(o, i)
        })
    }
    /* ********** Main Render *********************/
    if (reloaded.state) (async () => await reload())()
    return (
        <div className="grid-container" ref={ref}>
            <div style={gridStyle} className={paginate.enable ? "a-grid-container active-paging" : "a-grid-container"}>
                {(filtering.enable && filtering.type === "outer") && renderFilters()}
                {renderColumns()}
                {loading ? <Loading/> : data === null ? null : data.length === 0 ?
                    <EmptyData text={dataSourceIsNullText}/> :
                    <div className="a-grid-rows">{renderRows()}
                        <ReactTooltip delayShow={300}/>
                    </div>}

            </div>
            {paginate.enable && <div className="a-grid-paginate">
                <Pagination
                    size={pageSize}
                    current={currentPage}
                    changePageSize={handleChangePageSize}
                    changeCurrentPage={handleChangeCurrentPage}
                    totalCount={dataLength}
                />
            </div>}
        </div>
    )
})
export default Grid;
