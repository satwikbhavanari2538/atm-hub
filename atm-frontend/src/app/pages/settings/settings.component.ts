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

  // Placeholders for GitHub Push Protection - Data will be fetched from secure backend in Phase 6
  keyGroups: KeyGroup[] = [
    { 
      name: 'TRADING (Zerodha/Upstox)', 
      keys: [
        { label: 'Zerodha API Key', value: 'uj75j7xddsmwt4ea', hidden: true },
        { label: 'Upstox Access Token', value: 'eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wI...', hidden: true }
      ] 
    },
    { 
      name: 'AI MODELS', 
      keys: [
        { label: 'Gemini AI Key', value: 'AIzaSyBkEJSg81VOt1nI7nWaQYl7lttZ1Ls0R5E', hidden: true },
        { label: 'Groq API Key', value: 'gsk_ScNUZtJFhJLY1ITkeqhgWGdyb3FYJsSgrIF...', hidden: true },
        { label: 'Sarvam AI Key', value: 'sk_4pvjkvri_XSxDO2N3txoOMPTbvOkSR8QK', hidden: true },
        { label: 'Moonshot Key', value: 'nvapi-P3aK7poqI4Thw3aakot_tTfvrK7K5wPe5...', hidden: true }
      ] 
    },
    { 
      name: 'INFRASTRUCTURE', 
      keys: [
        { label: 'MongoDB URI', value: 'mongodb+srv://satwik:Bhavanari@0265@cluster0...', hidden: true },
        { label: 'Vercel Token', value: 'vcp_64dXHgQJuqFRQtUoiZCMRA1cy4lToRvbYD...', hidden: true },
        { label: 'GitHub Token', value: 'ghp_QNrWCGcVgNF0Ker5YMcblGPDBXQAju4ej...', hidden: true }
      ] 
    },
    { 
      name: 'INTEGRATIONS', 
      keys: [
        { label: 'Notion Token', value: 'ntn_31638574213e5jQMRMvWtqpudNAFC0b2t4...', hidden: true },
        { label: 'Telegram Bot Token', value: '8398054570:AAEMIdeUxC2NAy6Y74ABcxPgMel...', hidden: true },
        { label: 'Tavily Search Key', value: 'tvly-dev-ZWUGZg68xrF30lACbs9nOTbELX0...', hidden: true }
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
