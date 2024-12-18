import Errors from "./errors";
import type {
  User,
  UsersPage,
  ClientsPage,
  GroupsPage,
  Login,
  PageMetadata,
  Token,
  Response,
  ChannelsPage,
} from "./defs";

export default class Users {
  // Users API client
  /**
   * @class Users -
   * Users API is used for creating and managing users.
   * It is used for creating new users, logging in, refreshing tokens,
   * getting user information, updating user information, disabling
   * and enabling users.
   * @param {String} usersUrl - URL to the Users service.
   * @returns {Object} - Users object.
   */
  private readonly usersUrl: URL;

  private readonly clientsUrl?: URL;

  private readonly contentType: string;

  private readonly usersEndpoint: string;

  private readonly searchEndpoint: string;

  public constructor({
    usersUrl,
    clientsUrl,
  }: {
    usersUrl: string;
    clientsUrl?: string;
  }) {
    this.usersUrl = new URL(usersUrl);
    if (clientsUrl !== undefined) {
      this.clientsUrl = new URL(clientsUrl);
    } else {
      this.clientsUrl = new URL("");
    }
    this.contentType = "application/json";
    this.usersEndpoint = "users";
    this.searchEndpoint = "search";
  }

  public async Create(user: User, token?: string): Promise<User> {
    // Creates a new user
    /**
     * @method Create - Creates a new user.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     *  "email": "admin@example.com",
     * "first_name": "John",
     * "last_name": "Doe",
     * "credentials": {
     *    "username": "admin",
     *   "secret": "12345678"
     * }
     * }
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        new URL(this.usersEndpoint, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async CreateToken(login: Login): Promise<Token> {
    // Issue Access and Refresh Token used for authenticating into the system
    /**
     * @method CreateToken - Issue Access and Refresh Token used for authenticating into the system. A user can use either their email or username to login.
     * @param {Object} login - Login object with identity and secret. The identity can either be the email or the username of the user to be logged in.
     * @returns {Object} - Access, Refresh Token and Access Type.
     * @example
     * const login = {
     *  "identity": "admin",
     *  "secret": "12345678"
     * }
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
      },
      body: JSON.stringify(login),
    };
    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/tokens/issue`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const tokenData: Token = await response.json();
      return tokenData;
    } catch (error) {
      throw error;
    }
  }

  public async RefreshToken(refreshToken: string): Promise<Token> {
    // provides a new access token and refresh token.
    /**
     * @method Refresh_token - Provides a new access token and refresh token.
     * @param {String} refreshToken - refresh_token which is gotten from the token struct and used to get a new access token.
     * @returns {Object} - Access and Refresh Token.
     * @example
     * const refreshToken = "c52d-3b0d-43b9-8c3e-275c087d875af"
     * }
     *
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/tokens/refresh`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const tokenData: Token = await response.json();
      return tokenData;
    } catch (error) {
      throw error;
    }
  }

  public async Update(user: User, token: string): Promise<User> {
    // Update a user's names and metadata
    /**
     * @method Update - Updates a user's firstName, lastName and metadata.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "first_name": "John",
     * "last_name": "Doe",
     * "metadata": {
     * "doctor": "bar"
     * }
     * }
     *
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/${user.id}`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateEmail(user: User, token: string): Promise<User> {
    // Update a user email
    /**
     * @method UpdateEmail - Update a user email for a currently logged in user.
     * The user Email is updated using authorization user_token
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "email": "fkatwigs@email.com"
     *
     * }
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user.email }),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/email`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateUsername(user: User, token: string): Promise<User> {
    // Update a user's Username
    /**
     * @method UpdateUsername - Updates a user's username.
     * The username is updated using authorization user_token
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "credentials": {
     *  "username": "fkatwigs"
     * }
     *
     * }
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: user.credentials?.username }),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/username`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateProfilePicture(user: User, token: string): Promise<User> {
    // Update a user profile picture
    /**
     * @method UpdateUserEmail - Updates the profile picture of a user.
     * The profile picture is updated using authorization user_token. The profile picture is
     * provided as a string URL.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "profile_picture": "https://cloudstorage.example.com/bucket-name/user-images/profile-picture.jpg"
     *}
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profile_picture: user.profile_picture }),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/picture`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateUserTags(user: User, token: string): Promise<User> {
    // Update a user's tags.
    /**
     *  Updates tags of the user with provided ID. Tags is updated using
     * authorization user_tokeN.
     * @method UpdateUserTags - Update a user's tags.
     * @param {Object} user - User object.
     * @param{String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
     *      "tags": [
     *          "back",
     *         "end"
     *       ]
     *  }
     *
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/tags`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateUserPassword(
    oldSecret: string,
    newSecret: string,
    token: string
  ): Promise<User> {
    // Update a user's password.
    /**
     * Updates password of the user with provided valid token.
     *
     * @method UpdateUserPassword - Update a user's password.
     * @param {String} oldSecret - Old password.
     * @param {String} newSecret - New password.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const oldSecret = "12345678"
     * const newSecret = "87654321"
     *
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ old_secret: oldSecret, new_secret: newSecret }),
    };

    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/secret`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateUserRole(user: User, token: string): Promise<User> {
    // Update a user's role.
    /**
     * Updates password of the user with provided valid token.
     *
     * @method UpdateUserRole - Update a user's role.
     * @param {String} role - New role.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     *  "id": "886b4266-77d1-4258-abae-2931fb4f16de",
     *  "role": "admin"
     * }
     *
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/role`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async User(userId: string, token: string): Promise<User> {
    // Gets a user
    /**
     * Provides information about the user with provided ID. The user is
     * retrieved using authorization user_token.
     * @method User - Gets a user.
     * @param {String} userId - User ID.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const userId = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
     */

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/${userId}`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async UserProfile(token: string): Promise<User> {
    // Gets a user's profile
    /**
     * Provides information about the currently logged in user. The user is
     * retrieved using authorization user_token.
     * @method UserProfile - Gets a user's Profile.
     * @param {String} token - Access token that is unique to the user.
     * @returns {Object} - User object.
     *
     */

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/profile`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async Users(
    queryParams: PageMetadata,
    token: string
  ): Promise<UsersPage> {
    // Gets all users with pagination.
    /**
     * Provides information about all users. The users are retrieved using
     * authorization user_token.
     *
     * @method Users - Gets all users with pagination.
     * @param {Object} queryParams - Query parameters such as total, limit, offset and names.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10,
     * "total": 100,
     * }
     *
     */

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
          `${this.usersEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const usersData: UsersPage = await response.json();
      return usersData;
    } catch (error) {
      throw error;
    }
  }

  public async Disable(user: User, token: string): Promise<User> {
    // Disable a user
    /**
     * Disables a user with provided ID and valid token.
     * @method Disable - Disable a user.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "status": "disabled"
     * }
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/disable`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async Enable(user: User, token: string): Promise<User> {
    // Enable a user.
    /**
     * Enables a previously disabled user when provided with token and valid ID.
     * @method Enable - Enable a user.
     * @params {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "status": "enabled"
     * }
     *
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.usersEndpoint}/${user.id}/enable`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const userData: User = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async ListUserGroups(
    domainId: string,
    userId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<GroupsPage> {
    // Get groups of a user.
    /**
     * Gets the various groups a user belongs to.
     * @method ListUserGroups - Get memberships of a user.
     * @param {String} userId - Member ID that can be gotten from the pageMetadata.
     * @param {String} domainId - Domain ID.
     * @param {Object} queryParams - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Groups object.
     */

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
            this.usersEndpoint
          }/${userId}/groups?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const groupsData: GroupsPage = await response.json();
      return groupsData;
    } catch (error) {
      throw error;
    }
  }

  public async ListUserClients(
    userId: string,
    domainId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<ClientsPage> {
    // Get clients of a user.
    /**
     * Gets the various clients a user owns.
     * @method ListUserClients - Get memberships of a user.
     * @param {String} userId - Member ID.
     * @param {String} domainId - Domain ID.
     * @param {Object} queryParams - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Clients object.
     */
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
            this.usersEndpoint
          }/${userId}/clients?${new URLSearchParams(stringParams).toString()}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const clientsData: ClientsPage = await response.json();
      return clientsData;
    } catch (error) {
      throw error;
    }
  }

  public async ListUserChannels(
    domainId: string,
    userId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<ChannelsPage> {
    // Get channels of a user.
    /**
     * Gets the various channels a user owns.
     * @method ListUserChannels - Get channels of a user.
     * @param {String} userId - Member ID.
     * @param {String} domainId - Domain ID.
     * @param {Object} queryParams - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Channels object.
     */

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
            this.usersEndpoint
          }/${userId}/channels?${new URLSearchParams(stringParams).toString()}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const channelsPage: ChannelsPage = await response.json();
      return channelsPage;
    } catch (error) {
      throw error;
    }
  }

  public async ResetPasswordRequest(
    email: string,
    hostUrl: string
  ): Promise<Response> {
    // Sends a request to reset a password
    /**
     * @method ResetPasswordRequest - Sends a request
     * @param {String} email - User email.
     * @param {string} hostUrl - URL of the host UI.
     * @returns {Obj} - Response - Status of the request and a message.
     */

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Referer: hostUrl,
      },
      body: JSON.stringify({ email }),
    };
    try {
      const response = await fetch(
        new URL("/password/reset-request", this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const resetRequestResponse: Response = {
        status: response.status,
        message: "Email with reset link sent successfully",
      };
      return resetRequestResponse;
    } catch (error) {
      throw error;
    }
  }

  public async ResetPassword(
    password: string,
    confPass: string,
    token: string
  ): Promise<Response> {
    // Resets a user password
    /**
     * @method ResetPassword - Resets a password.
     * @param {String} password - User Password.
     * @param {String} confPass - User to confirm the Password.
     * @param {String} token - Access token.
     * @returns {Obj} - Response - Status of the request and a message.
     *
     */

    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": this.contentType,
      },
      body: JSON.stringify({ token, password, confirm_password: confPass }),
    };
    try {
      const response = await fetch(
        new URL("/password/reset", this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const resetResponse: Response = {
        status: response.status,
        message: "Password reset successfully",
      };
      return resetResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteUser(userId: string, token: string): Promise<Response> {
    // Deletes a user
    /**
     * @method DeleteUser - Deletes a user.
     * @param {String} userId - User ID.
     * @param {String} token - Authentication token.
     * @returns {Obj} - Response - Status of the request and a message.
     *
     */

    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${this.usersEndpoint}/${userId}`, this.usersUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "User deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async SearchUsers(
    queryParams: PageMetadata,
    token: string
  ): Promise<UsersPage> {
    // Search for users
    /**
     * @method SearchUsers - Search for users.
     * @param {Object} queryParams - Query parameters.
     * @param {String} token - Access token.
     * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10,
     * "first_name": "John",
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af"
     * }
     * @returns {Object} - Users Page object.
     * */

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
          `${this.usersEndpoint}/${this.searchEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const usersData: UsersPage = await response.json();
      return usersData;
    } catch (error) {
      throw error;
    }
  }
}
