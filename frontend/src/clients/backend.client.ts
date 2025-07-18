import axios from "axios";
import { IUserProps } from "../dtos/user.dto";

export class BackendClient {
  private readonly baseUrl: string;

  constructor(baseUrl = "http://localhost:3001/v1") {
    this.baseUrl = baseUrl;
  }

  async getAllUsers(term: string = ""): Promise<{ data: IUserProps[] }> {
    return (await axios.get(`${this.baseUrl}/people/all?term=${term}`, {})).data;
  }
}
