import { Configuration, OpenAIApi } from 'openai';
import type { ListEnginesResponse } from 'openai';

export type OrganizationType = string;

export type APIKeyType = string;

export class OpenAI {
  private api: OpenAIApi;

  constructor(organization: OrganizationType, apiKey: APIKeyType) {
    this.api = new OpenAIApi(
      new Configuration({
        organization,
        apiKey,
      }),
    );
  }

  public async listEngines(): Promise<ListEnginesResponse> {
    const response = await this.api.listEngines();
    return response.data;
  }

  public async generateText(
    prompt: string,
    model = 'text-davinci-003',
  ): Promise<string> {
    try {
      const completion = await this.api.createCompletion({
        model,
        prompt,
        temperature: 0,
        max_tokens: 1000,
        logprobs: null,
        stream: false,
        stop: '',
        top_p: 1,
        n: 1,
      });
      return completion.data.choices.map((choice) => choice.text).join(' ');
    } catch (error) {
      if (error.response) {
        return `Error: ${error.response.status} | ${error.response.data?.error?.message}`;
      }
      return `Error: ${error.message}`;
    }
  }
}
