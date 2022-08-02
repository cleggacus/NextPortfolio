import { Post } from ".";
import { Properties } from "./collectProperties";

const convertPropertiesToPost = (data: Properties): Post =>{
  if(!(
    data.Name.object == "list" && 
    data.Name.results[0].type == "title" &&
    data.Description.object == "list" && 
    data.Description.results[0].type == "rich_text" &&
    data.Created.object == "property_item" &&
    data.Created.type == "created_time" &&
    data.Tags.object == "property_item" &&
    data.Tags.type == "multi_select"
  )) return {
    id: "",
    title: "",
    description: "",
    created: "",
    thumbnail: "",
    tags: []
  };


  let post = {
    id: "",
    title: data.Name.results[0].title.plain_text,
    description: data.Description.results[0].rich_text.plain_text,
    created: data.Created.created_time,
    tags: data.Tags.multi_select.map(res => ({
      name: res.name,
      color: res.color
    })),
    thumbnail: ""
  }

  return post;
}

export default convertPropertiesToPost