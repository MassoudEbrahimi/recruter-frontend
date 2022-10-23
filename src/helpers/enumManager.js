const StatusCodeEnum = {SUCCESS: 0, ERROR: 1, WARNING: 2, PROGRESS: 3};
// const MachineMetricTypeEnum = {CPU: 1, MEMORY: 2, DISK: 3, NETWORK: 4};
// const DataRequestTypeEnum = {REALTIME: 1, WEEKLY: 2, DAILY: 3, ARCHIVE: 4};
const ColorStatusEnum = {ERROR: "#FF0D0D", WARNING: "#FF8C01", SUCCESS: "#006B3E", Progress: "#132743"};


class EnumManager {
    StatusColorCodeEnum = type => {
        switch (type) {
            case StatusCodeEnum.SUCCESS :
                return ColorStatusEnum.SUCCESS;
            case StatusCodeEnum.ERROR :
                return ColorStatusEnum.ERROR;
            case StatusCodeEnum.WARNING :
                return ColorStatusEnum.WARNING;
            case StatusCodeEnum.PROGRESS :
                return ColorStatusEnum.Progress;
            default:
                return "#000000"
        }
    }
    StatusColorCodePriority = list => {
        return list.some(o => o.status === StatusCodeEnum.ERROR) ?
            ColorStatusEnum.ERROR : list.some(o => o.status === StatusCodeEnum.WARNING) ? ColorStatusEnum.WARNING :
                list.every(o => o.status === StatusCodeEnum.SUCCESS) ? ColorStatusEnum.SUCCESS : ColorStatusEnum.Progress;
    }
    TaskCounter = list => {
        const count = {};
        for (let [key, value] of StatusCodeEnum) {
            count[`${key}`] = list.count(o => o.status === value);
        }
        return count;
    }
    MetricTypeEnum = (type, data) => {

    }
    DataTypeRequestEnum = (type, data) => {

    }
    TypeCodeConvertor = (code) => {
        switch (code) {
            case 410:
                return "call"
            case 310:
                return "Sms"
            default:
                return "";
        }
    }
    SortIcon = (type) => {
        const icon = {ascend: "", descend: ""}
        switch (type) {
            case "string":
                icon["ascend"] = "mdi mdi-sort-alphabetical-ascending";
                icon["descend"] = "mdi mdi-sort-alphabetical-descending";
                break;
            case "number":
                icon["ascend"] = "mdi mdi-sort-numeric-ascending";
                icon["descend"] = "mdi mdi-sort-numeric-descending";
                break;
            case "date":
                icon["ascend"] = "mdi mdi-sort-calendar-ascending";
                icon["descend"] = "mdi mdi-sort-calendar-descending";
                break;
            case "bool":
                icon["ascend"] = "mdi mdi-sort-bool-ascending-variant"
                icon["descend"] = "mdi mdi-sort-bool-descending-variant"
                break;
            default :
                return icon;
        }
        return icon;
    }
}

const _EnumManager = new EnumManager();
export default _EnumManager;
