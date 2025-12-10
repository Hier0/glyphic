import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Image,
  Upload,
  Sparkles,
  FileImage,
  Download,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AssetsLibrary() {
  const [selectedSection, setSelectedSection] = useState<'generated' | 'imported'>('generated');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would come from state/props
  const generatedAssets = [
    { id: '1', name: 'Sunset Landscape', type: 'image', thumbnail: '/placeholder-image.jpg', createdAt: '2024-01-15' },
    { id: '2', name: 'Abstract Art', type: 'image', thumbnail: '/placeholder-image.jpg', createdAt: '2024-01-14' },
    { id: '3', name: 'Product Photo', type: 'image', thumbnail: '/placeholder-image.jpg', createdAt: '2024-01-13' },
  ];

  const importedAssets = [
    { id: '4', name: 'Company Logo', type: 'image', thumbnail: '/placeholder-image.jpg', createdAt: '2024-01-12' },
    { id: '5', name: 'Background Pattern', type: 'image', thumbnail: '/placeholder-image.jpg', createdAt: '2024-01-11' },
  ];

  const currentAssets = selectedSection === 'generated' ? generatedAssets : importedAssets;
  const filteredAssets = currentAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          className="pl-9 bg-gray-50" 
          placeholder="Search assets..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Section Toggle Buttons */}
      <div className="flex gap-2">
        <Button 
          variant={selectedSection === 'generated' ? 'default' : 'outline'}
          className="flex-1 rounded-full"
          onClick={() => setSelectedSection('generated')}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generated Assets
        </Button>
        <Button 
          variant={selectedSection === 'imported' ? 'default' : 'outline'}
          className="flex-1 rounded-full"
          onClick={() => setSelectedSection('imported')}
        >
          <Upload className="h-4 w-4 mr-2" />
          Imported Assets
        </Button>
      </div>

      {/* Import Button for Imported Assets */}
      {selectedSection === 'imported' && (
        <Button className="w-full" variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import Asset
        </Button>
      )}

      {/* Assets Grid */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-gray-100 relative group">
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/90 hover:bg-white">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/90 hover:bg-white">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{asset.name}</p>
                <p className="text-xs text-gray-500 mt-1">{asset.createdAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Image className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">
            {searchQuery 
              ? 'No assets found matching your search'
              : selectedSection === 'generated'
              ? 'No generated assets yet'
              : 'No imported assets yet'}
          </p>
          {selectedSection === 'imported' && !searchQuery && (
            <Button variant="outline" size="sm" className="mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Import Your First Asset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

