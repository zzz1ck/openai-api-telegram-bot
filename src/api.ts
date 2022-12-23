import { Configuration, OpenAIApi } from 'openai';
import type { ListEnginesResponse, ImagesResponse } from 'openai';

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

  public async generateImageVariation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileStream: any,
    amount = 1,
    size = '1024x1024',
  ): Promise<ImagesResponse | string> {
    try {
      const response = await this.api.createImageVariation(
        fileStream,
        amount,
        size,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return `🤬 ${error.response.data.error.message}`;
      }
      return `🤬 ${error.message}`;
    }
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

      if (completion.data?.choices.length === 1 && !completion.data?.choices[0].text) {
        return 'There\'s nothing to add here. 🤓';
      }

      return completion.data.choices.map((choice) => choice.text).join(' ');
    } catch (error) {
      if (error.response) {
        return `🤬 ${error.response.data.error.message}`;
      }
      return `🤬 ${error.message}`;
    }
  }
}
