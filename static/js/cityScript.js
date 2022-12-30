let url = new URL(window.location.href);


function reload(url){
    let empty_params = [];
    for(let key in url.searchParams){
        if(!url.searchParams.get(key)){
            empty_params.push(key);
        }
    }
    for(key in empty_params){
        delete url.searchParams[key];
    }
    window.location.replace(url.href);
}

function get_current_sort_values(){
    let sort_string = url.searchParams.get("sortby")
    let current_sort_values = []
    if(sort_string){
        current_sort_values = sort_string.split(',')
    }
    return current_sort_values
}

function sortTable(column_name){    
    let current_sort_values = get_current_sort_values();
    let sorted = false;
    url.searchParams.delete("page");
    for(let i=0; i<current_sort_values.length; i++){
        let this_col_name = current_sort_values[i].startsWith('-')?current_sort_values[i].slice(1):current_sort_values[i];
        if(column_name == this_col_name){
            let current_sort_order = current_sort_values[i].startsWith('-')?"desc":"asc";
            if(current_sort_order == 'desc'){
                current_sort_values.splice(i, 1);
                console.log(current_sort_values)
            }
            else{
                current_sort_values[i] = current_sort_values[i].startsWith('-')?this_col_name: '-' + this_col_name;
            }
            sorted = true;
            break;
        }
    }
    if(!sorted){
        current_sort_values.push(column_name);
    }
    
    if(current_sort_values.length>0){
        url.searchParams.set("sortby", current_sort_values.join(','))
    }
    else{
        url.searchParams.delete("sortby");
    }
    reload(url);
}

function handleSearch(){
    let search_key = document.getElementById("searchbox").value;
    url.searchParams.delete("search");
    url.searchParams.delete("sortby");
    url.searchParams.delete("order");
    url.searchParams.delete("page");
    if(search_key)
        url.searchParams.set("search", search_key);
    reload(url);
}

function init(){
    // Initiate sort index
    let current_sort_values = get_current_sort_values();
    for(let i=0;i<current_sort_values.length;i++){
        let current_sort_order = current_sort_values[i].startsWith('-')?"desc":"asc";
        let this_col_name = current_sort_values[i].startsWith('-')?current_sort_values[i].slice(1):current_sort_values[i];
        let id = "icon_" + this_col_name;
        if(current_sort_order == "asc"){
            document.getElementById(id).className = "fa fa-fw fa-sort-asc";
        }
        else if(current_sort_order == "desc"){
            document.getElementById(id).className = "fa fa-fw fa-sort-desc";
        }
    }

    search_term = url.searchParams.get("search");
    if(search_term){
        document.getElementById("searchbox").value = search_term;
    }

    document.getElementById("searchbtn").addEventListener("click", handleSearch);
    document.getElementById("searchbox").addEventListener('keyup', (e)=>{if(e.key === 'Enter') handleSearch()});
}

init();
