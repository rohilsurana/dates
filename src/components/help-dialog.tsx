'use client';

import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="h-5 w-5 text-neutral-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">About Date Tracker</DialogTitle>
          <DialogDescription className="text-base">
            Track time elapsed since important moments in your life
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <section>
            <h3 className="font-semibold text-lg mb-2">What is Date Tracker?</h3>
            <p className="text-neutral-600 leading-relaxed">
              Date Tracker is a simple, privacy-focused app that helps you track how much time has
              passed since important dates in your life. Whether it's birthdays, anniversaries,
              milestones, or any special moment, Date Tracker keeps count in real-time.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">How to Use</h3>
            <div className="space-y-3 text-neutral-600">
              <div>
                <strong className="text-neutral-900">Adding a Date:</strong>
                <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
                  <li>Select a date from the calendar (required)</li>
                  <li>Optionally add a specific time</li>
                  <li>Give it a name (optional) - e.g., "Rachel's Birthday"</li>
                  <li>Add relevant tags like birthday, anniversary, etc.</li>
                  <li>Click "Track Date" to save</li>
                </ol>
              </div>

              <div>
                <strong className="text-neutral-900">Managing Dates:</strong>
                <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  <li>Hover over any date card to see edit and delete options</li>
                  <li>Use filters to view dates by specific tags</li>
                  <li>Sort by original date, date created, or name</li>
                </ul>
              </div>

              <div>
                <strong className="text-neutral-900">Special Features:</strong>
                <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  <li>Real-time countdown showing years, months, days, hours, minutes, and seconds</li>
                  <li>🎉 Birthday and anniversary dates show a celebration icon on their special day</li>
                  <li>All data is stored locally on your device - nothing is sent to any server</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">Privacy & Data</h3>
            <p className="text-neutral-600 leading-relaxed">
              Your data is completely private. All dates and information are stored locally in your
              browser's storage. Nothing is ever sent to external servers. If you clear your browser
              data, your tracked dates will be removed.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">Tips</h3>
            <ul className="list-disc list-inside ml-2 space-y-1 text-neutral-600">
              <li>Use tags to organize dates by category</li>
              <li>Leave the name blank to just track a date without a label</li>
              <li>Time is optional - add it only if you need precision</li>
              <li>For birthdays and anniversaries, the celebration icon appears on the anniversary date each year</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
