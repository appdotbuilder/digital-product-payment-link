<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentProofRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'proof_file' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'proof_file.required' => 'Bukti transfer wajib diupload.',
            'proof_file.image' => 'File harus berupa gambar.',
            'proof_file.mimes' => 'Format gambar harus: jpeg, jpg, png.',
            'proof_file.max' => 'Ukuran gambar maksimal 2MB.',
            'notes.max' => 'Catatan maksimal 1000 karakter.',
        ];
    }
}