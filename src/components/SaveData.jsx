import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const SaveData = ({ onSave }) => {
  return (
    <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Save Your Data</h3>
      <p className="text-sm text-slate-600 mb-4">
        Save your details & invoice history to create your next invoice in 10 seconds (it's FREE).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-4">
        <div>
          <Label htmlFor="email" className="sr-only">Email</Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="password"  className="sr-only">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </div>
      </div>
      <Button
        onClick={onSave}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Create Free Account
      </Button>
    </div>
  );
};

export default SaveData;