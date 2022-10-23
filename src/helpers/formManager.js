

class FormManager{
    ConvertValuesToObject(data){
        let obj = {};
        // let IsUniq = {}
        data.forEach(n => {
            switch (n.type) {
                case "select":
                    obj[n.field] = n.value ? (n.value.id ? n.value.id : n.value) : null;
                    break;
                case "datepicker":
                    obj[n.field] = n.value ? n.value.dateStr === null ? "" : n.value.dateStr : "";
                    break;
                case "select-color":
                    obj[n.field] = n.value.id
                    break;
                case "checkbox":
                    obj[n.field] = n.value !== "" ? n.value : false;
                    break;
                case "number":
                    obj[n.field] = n.value !== "" ? n.value : "";
                    break;
                case "segment-picker":
                    obj["Colors"] = n.value.Color ? [...n.value.Color] : null
                    obj["Color"] = n.value.Color ? n.value.Color[0] : null
                    obj["Segments"] = n.value.Segment ? [...n.value.Segment] : null
                    obj["Min"] = n.value.Segment ? n.value.Segment[0] : null
                    obj["Max"] = n.value.Segment ? n.value.Segment[n.value.Segment.length - 1] : null
                    break;
                case "segment-picker-report-type":
                    const {Color , Segment} = n.value;
                    const list = []
                    if(Color && Segment){
                        for(let i = 0 ; i < Color.length ; i++){
                            list.push({
                                min: Segment[i],
                                max: Segment[i+1],
                                color:Color[i]
                            })
                        }
                        obj["jsonConfig"] = [...list];
                    }else{
                        obj["jsonConfig"] = [...n.value];
                    }


                    break;
                case "metrics":
                    obj[n.field] = {
                        ProjectId: 1,
                        Name: ""
                    }
                    break;
                case "select-name":
                    obj[n.field] = n.value.name
                    break;
                case "textarea":
                    obj[n.field] = n.value;
                    break;
                case "file":
                    obj[n.field] = n.value;
                    break;
                case "select-id-value":
                    obj[n.field] = n.value.id;
                    obj[`${n.field}Name`] = n.value.name;
                    break;
                default :
                    obj[n.field] = n.value;
                    break;
            }
            //#endregion
        });
        return obj
    }
}
const _FormManager = new FormManager();
export default _FormManager;