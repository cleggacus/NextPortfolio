import { GetPagePropertyResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notionClient from "./notionClient";

export type Properties = {
  [key: string]: GetPagePropertyResponse
}

const collectProperties = async (page: PageObjectResponse) => {
  const properties = page.properties;

  let responses: Promise<GetPagePropertyResponse>[] = [];

  for(const key in properties) {
    responses.push(
      notionClient.pages.properties.retrieve({
        page_id: page.id,
        property_id: properties[key].id
      })
    )
  }

  const responsesParsed = await Promise.all(responses);

  let obj: Properties = {};

  for(let i = 0; i < responsesParsed.length; i++) {
    const key = Object.keys(properties)[i];
    obj[key] = responsesParsed[i];
  }

  return obj;
}

export default collectProperties;