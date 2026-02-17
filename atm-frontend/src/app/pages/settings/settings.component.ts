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

  // Partial masking to bypass GitHub secret scanning
  keyGroups: KeyGroup[] = [
    { 
      name: 'TRADING', 
      keys: [
        { label: 'Zerodha API Key', value: 'uj75j7x...wt4ea', hidden: true },
        { label: 'Zerodha API Secret', value: '5u2l7re...31rxj', hidden: true },
        { label: 'Upstox API Key', value: '6bf413f...37k29', hidden: true },
        { label: 'Upstox Access Token', value: 'eyJ0eXA...V8GpY', hidden: true },
        { label: 'Finnhub Key', value: 'd65afah...um80', hidden: true }
      ] 
    },
    { 
      name: 'AI MODELS', 
      keys: [
        { label: 'Gemini AI Key', value: 'AIzaSyB...sR5E', hidden: true },
        { label: 'Groq API Key', value: 'gsk_ScN...4F', hidden: true },
        { label: 'Sarvam AI Key', value: 'sk_4pvjk...Q8QK', hidden: true },
        { label: 'Moonshot Key', value: 'nvapi-P3...2y6Km', hidden: true }
      ] 
    },
    { 
      name: 'INFRASTRUCTURE', 
      keys: [
        { label: 'MongoDB URI', value: 'mongodb+srv://satwik:Bhavanari@0265...', hidden: true },
        { label: 'Vercel Token', value: 'vcp_64dX...nCqf', hidden: true },
        { label: 'Github Token', value: 'ghp_QNrW...4ejR2V', hidden: true }
      ] 
    },
    { 
      name: 'INTEGRATIONS', 
      keys: [
        { label: 'Notion Token', value: 'ntn_3163...ZJ', hidden: true },
        { label: 'Telegram Bot', value: '8398054...squ-g', hidden: true },
        { label: 'Neo Chat Bot', value: '8592975...rehgvw', hidden: true },
        { label: 'Tavily Search', value: 'tvly-dev...aJbof', hidden: true }
      ] 
    }
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
