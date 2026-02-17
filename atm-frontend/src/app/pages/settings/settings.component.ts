import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface KeyGroup {
  name: string;
  keys: { label: string; value: string; hidden: boolean }[];
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  activeTab = signal<'general' | 'keys'>('general');
  pin = signal('');
  isUnlocked = signal(false);
  showPinError = signal(false);

  // Mocked from keys.md for now, would be an API call in next phase
  keyGroups: KeyGroup[] = [
    { name: 'Zerodha', keys: [{ label: 'API Key', value: 'uj75j7xddsmwt4ea', hidden: true }, { label: 'API Secret', value: '5u2l7recrsv5...', hidden: true }] },
    { name: 'Upstox', keys: [{ label: 'Access Token', value: 'eyJ0eXAiOiJKV1Qi...', hidden: true }] },
    { name: 'Sarvam AI', keys: [{ label: 'API Key', value: 'sk_4pvjkvri_XSx...', hidden: true }] },
    { name: 'Groq', keys: [{ label: 'API Key', value: 'gsk_ScNUZtJFhJL...', hidden: true }] },
    { name: 'Vercel', keys: [{ label: 'Token', value: 'vcp_64dXHgQJuq...', hidden: true }] },
    { name: 'MongoDB', keys: [{ label: 'URI', value: 'mongodb+srv://satwik:Bhavanari@0265...', hidden: true }] },
  ];

  verifyPin() {
    if (this.pin() === '0265') {
      this.isUnlocked.set(true);
      this.showPinError.set(false);
    } else {
      this.showPinError.set(true);
      this.pin.set('');
    }
  }

  toggleKey(groupIndex: number, keyIndex: number) {
    this.keyGroups[groupIndex].keys[keyIndex].hidden = !this.keyGroups[groupIndex].keys[keyIndex].hidden;
  }

  maskValue(val: string) {
    return '•'.repeat(20);
  }
}
