import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ConfigItem {
  key: string;
  value: string;
  isSecret: boolean;
  revealed: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  configs: ConfigItem[] = [
    { key: 'OPENCLAW_GATEWAY_URL', value: 'ws://127.0.0.1:18789', isSecret: false, revealed: true },
    { key: 'MONGODB_URI', value: 'mongodb+srv://satwik:Bhavanari@0265@cluster0.n9xwil0.mongodb.net/', isSecret: true, revealed: false },
    { key: 'DISCORD_TOKEN', value: 'MTQ3MzMxNzIyNzUzMTk5NzI2OA.GtDKLC...', isSecret: true, revealed: false },
    { key: 'HEARTBEAT_INTERVAL', value: '30m', isSecret: false, revealed: true },
  ];

  isDark = signal<boolean>(true); // Placeholder for theme toggle logic

  toggleReveal(item: ConfigItem) {
    if (item.isSecret) {
      // In a real app, we would prompt for PIN here
      item.revealed = !item.revealed;
    }
  }

  maskValue(value: string): string {
    return '•'.repeat(24);
  }
}
