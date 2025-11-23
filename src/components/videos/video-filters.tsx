/**
 * VideoFilters Component
 *
 * Provides filtering and sorting controls for the video library.
 * Supports search, channel filter, outlier filter, and sorting options.
 */

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X, Sparkles, TrendingUp, Calendar, Eye } from 'lucide-react';

export interface VideoFilterOptions {
  search: string;
  channelId?: string;
  watchlistId?: string;
  isOutlier: boolean;
  sortBy: 'views' | 'engagement' | 'date';
  sortOrder: 'asc' | 'desc';
}

interface VideoFiltersProps {
  filters: VideoFilterOptions;
  onFilterChange: (filters: VideoFilterOptions) => void;
  channels?: Array<{ id: string; name: string }>;
  watchlists?: Array<{ id: string; name: string }>;
  showWatchlistFilter?: boolean;
}

export function VideoFilters({
  filters,
  onFilterChange,
  channels = [],
  watchlists = [],
  showWatchlistFilter = false
}: VideoFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  // Handle search input with debouncing
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Debounce search - you can add debounce logic here
    onFilterChange({ ...filters, search: value });
  };

  const clearSearch = () => {
    setSearchValue('');
    onFilterChange({ ...filters, search: '' });
  };

  const toggleOutlierFilter = () => {
    onFilterChange({ ...filters, isOutlier: !filters.isOutlier });
  };

  const handleChannelChange = (value: string) => {
    onFilterChange({
      ...filters,
      channelId: value === 'all' ? undefined : value
    });
  };

  const handleWatchlistChange = (value: string) => {
    onFilterChange({
      ...filters,
      watchlistId: value === 'all' ? undefined : value
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value as VideoFilterOptions['sortBy'] });
  };

  const handleSortOrderToggle = () => {
    onFilterChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  };

  const clearAllFilters = () => {
    setSearchValue('');
    onFilterChange({
      search: '',
      isOutlier: false,
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const activeFilterCount = [
    filters.search,
    filters.channelId,
    filters.watchlistId,
    filters.isOutlier
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search videos by title or description..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Channel Filter */}
        {channels.length > 0 && (
          <Select
            value={filters.channelId || 'all'}
            onValueChange={handleChannelChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              {channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Watchlist Filter */}
        {showWatchlistFilter && watchlists.length > 0 && (
          <Select
            value={filters.watchlistId || 'all'}
            onValueChange={handleWatchlistChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Watchlists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Watchlists</SelectItem>
              {watchlists.map((watchlist) => (
                <SelectItem key={watchlist.id} value={watchlist.id}>
                  {watchlist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Outliers Only Button */}
        <Button
          variant={filters.isOutlier ? 'default' : 'outline'}
          size="sm"
          onClick={toggleOutlierFilter}
          className={filters.isOutlier ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Outliers Only
        </Button>

        {/* Sort By */}
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date
              </div>
            </SelectItem>
            <SelectItem value="views">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Views
              </div>
            </SelectItem>
            <SelectItem value="engagement">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Engagement
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSortOrderToggle}
          title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        >
          {filters.sortOrder === 'asc' ? '↑' : '↓'}
        </Button>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="ml-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary">
              Search: "{filters.search}"
              <button
                onClick={clearSearch}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.channelId && (
            <Badge variant="secondary">
              Channel: {channels.find(c => c.id === filters.channelId)?.name}
              <button
                onClick={() => handleChannelChange('all')}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.watchlistId && (
            <Badge variant="secondary">
              Watchlist: {watchlists.find(w => w.id === filters.watchlistId)?.name}
              <button
                onClick={() => handleWatchlistChange('all')}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.isOutlier && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Outliers Only
              <button
                onClick={toggleOutlierFilter}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
