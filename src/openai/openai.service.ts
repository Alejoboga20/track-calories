import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { envConfigVars } from 'src/config/envs';
import { MealAnalysisResult } from 'src/image-analysis/types/meal-analysis-result.interface';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly aiClient = new OpenAI({
    apiKey: envConfigVars.openAIApiKey,
  });

  constructor() {
    this.logger.log('OpenAIService initialized');
  }

  async analyseImage(base64Image: string) {
    const response = await this.aiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
                You're a nutrition expert. Analyze the image and determine if it contains food. 
                If it does, identify the dish and estimate the macronutrients **in grams** (protein, carbs, fat) and total calories. 
                If the image does not show a meal, respond with:

                \`\`\`json
                {
                  "detected": false
                }
                \`\`\`

                Otherwise, respond with a JSON object like this:

                \`\`\`json
                {
                  "dish": "Example dish name",
                  "protein": 20, // grams
                  "carbs": 35,   // grams
                  "fat": 15,     // grams
                  "calories": 450,
                  "detected": true
                }
                \`\`\`

                Be concise and consistent. Do not include units in the values. Respond only with the JSON block.
              `,
            },
            {
              type: 'input_image',
              detail: 'high',
              image_url: `data:image/jpeg;base64,${base64Image}`,
            },
          ],
        },
      ],
    });

    const rawOutput = response.output_text;

    try {
      const jsonText = rawOutput.match(/```json\n([\s\S]*?)```/)?.[1];
      if (!jsonText) throw new Error('Invalid response format');

      const parsedResponse = JSON.parse(jsonText) as MealAnalysisResult;
      return parsedResponse;
    } catch (error) {
      this.logger.error('Error parsing response', error);
      this.logger.error(`Raw output: ${rawOutput}`);

      throw new BadRequestException(
        'Failed to parse meal analysis response. Please ensure the image is clear and contains food items.',
      );
    }
  }
}
