import { BASE_URL, authHeaders, withAuthQuery } from './api';

export type ScanItem = {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type ScanSummary = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type ScanResponse = {
  scanId: string;
  items: ScanItem[];
  summary: ScanSummary;
};

function scanUploadUrl(): string {
  return withAuthQuery(`${BASE_URL}/scan`);
}

/** Multipart upload: field name must be `image` per API docs. */
export async function uploadFoodScan(imageUri: string): Promise<ScanResponse> {
  const form = new FormData();
  const name = imageUri.split('/').pop() || 'meal.jpg';
  const ext = name.split('.').pop()?.toLowerCase();
  const mime =
    ext === 'png' ? 'image/png' : ext === 'heic' || ext === 'heif' ? 'image/heic' : 'image/jpeg';
  form.append('image', {
    uri: imageUri,
    name: name.includes('.') ? name : `${name}.jpg`,
    type: mime,
  } as unknown as Blob);

  const headers = authHeaders(false);
  const res = await fetch(scanUploadUrl(), {
    method: 'POST',
    headers,
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Scan failed (${res.status})`);
  }
  return res.json();
}

export async function logScanResult(params: {
  scanId?: string;
  mealType?: string;
  date?: string;
  items: { name: string; calories: number; protein: number; carbs: number; fat: number }[];
}): Promise<{ message: string; loggedCount: number }> {
  const url = withAuthQuery(`${BASE_URL}/scan/log`);
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify({
      scanId: params.scanId ?? null,
      mealType: params.mealType ?? 'Snack',
      date: params.date ?? new Date().toISOString().split('T')[0],
      items: params.items,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Log scan failed (${res.status})`);
  }
  return res.json();
}
