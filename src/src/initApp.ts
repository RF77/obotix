import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export const importFilesTexts: string[] = [];

export async function intializeApp(http: HttpClient): Promise<void> {
  const response = await firstValueFrom(http.get("assets/generated_types/app/components/formula-editor/services/calculate-result.service.d.ts", { responseType: 'text' }));
  console.debug("intializeApp", response);
  importFilesTexts.push(response);

  importFilesTexts.push(`declare var gc:GcService;`)
}

