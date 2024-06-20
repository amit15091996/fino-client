// for sorting

import dayjs from "dayjs";

export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  

export function descendingComparator(a, b, orderBy) {


if(tabledateCheck(b[orderBy]) && tabledateCheck(a[orderBy])){

  return dayjs(b[orderBy],"DD/MM/YYYY")-dayjs(a[orderBy],"DD/MM/YYYY")
}


 else if(tableDataTypeCheck(b[orderBy]) && tableDataTypeCheck(a[orderBy])){

    if (+b[orderBy] < +a[orderBy]) {

      return -1;
    }
    if (+b[orderBy] > +a[orderBy]) {
      return 1;
    }
    return 0;


  }
  else if(typeof(b[orderBy])==="string" && typeof(a[orderBy])==="string"){
    if (b[orderBy]?.toUpperCase() < a[orderBy]?.toUpperCase()) {

      return -1;
    }
    if (b[orderBy]?.toUpperCase() > a[orderBy]?.toUpperCase()) {
      return 1;
    }
    return 0;
  }

  else{
    if (b[orderBy] < a[orderBy]) {

      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  
  }
   
  }

  export function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }
  

  //for filtering

  export function filteredArray(rows,columns,operators,value){

  if(columns?.length>0 && operators?.length>0,value?.length>0){

 
    if(operators==="contains"){
  
        return rows?.filter((item,index)=> item[columns]?.toString()?.toUpperCase()?.includes(value?.toString()?.toUpperCase()))
      }
     
    else if(operators==="equals"){
        return rows?.filter((item,index)=>item[columns]?.toString()?.toUpperCase()===value?.toString()?.toUpperCase()) 
    }
    else if(operators==="startswith"){
    
        return rows?.filter((item,index)=>item[columns]?.toString()?.toUpperCase()?.startsWith(value?.toString()?.toUpperCase()))
    
    }
    else if(operators==="endswith"){
        return rows?.filter((item,index)=>item[columns]?.toString()?.toUpperCase()?.endsWith(value?.toString()?.toUpperCase()))
  
    }
    else if(operators==="isanyof"){
        return rows?.filter((item,index)=>item[columns]?.toString()?.toUpperCase()?.match(/value?.toString()?.toUpperCase()/g))
  
    }
    else{
  
      return rows
    }
  }
else{
  return rows
}
  
  
  }
  

  const tableDataTypeCheck=(field)=> !isNaN(Number(field))

  const tabledateCheck=(field)=> dayjs(field,"DD/MM/YYYY")?.isValid()
  export const IsArrayTable = (data) =>data?Array.isArray(data):false