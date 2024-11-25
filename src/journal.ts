import type { JournalsPage, JournalsPageMetadata } from "./defs";
import Errors from "./errors";

/**
* @class Journal
* Handles interactions with Journal API.
*/
export default class Journal {
  private readonly journalsUrl: URL;

  private readonly journalsEndpoint: string;

  private readonly contentType: string;

  /**
   * @constructor
   * Initializes the Channel API client.
   * @param {object} config - Configuration object.
   * @param {string} config.journalsUrl - Base URL for the journal API.
   */
  public constructor(journalsUrl: string) {
    this.journalsUrl = new URL(journalsUrl);
    this.contentType = "application/json";
    this.journalsEndpoint = "journal";
  }

  /**
  * @method Journal - Retrieve entity journals by entity id matching the provided query parameters.
  * @param {string} entityType - Entity type e.g client.
  * @param {string} entityId - The  unique ID of the entity.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {object} queryParams - Query parameters for the request.
  * @param {string} token - Authorization token.
  * @returns {Promise<JournalsPage>} journalsPage - A page of journals.
  * @throws {Error} - If the journals cannot be fetched.
  */
  public async Journal(
    entityType: string,
    entityId: string,
    domainId: string,
    queryParams: JournalsPageMetadata,
    token: string
  ): Promise<JournalsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${
            this.journalsEndpoint
          }/${entityType}/${entityId}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.journalsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const journalsPage: JournalsPage = await response.json();
      return journalsPage;
    } catch (error) {
      throw error;
    }
  }
}
