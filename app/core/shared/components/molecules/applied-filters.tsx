import { formatFilters } from '../../utils';
import { Badge, Button, Card, CardContent, CardHeader } from '../atoms';

interface IAppliedFilters {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  onClear: () => void;
}

export const AppliedFilters = ({
  filters,
  labels,
  onClear
}: IAppliedFilters) => {
  const formattedFilters = formatFilters(filters, labels);
  const hasFilters = formattedFilters.length > 0;

  return (
    <>
      {hasFilters && (
        <Card className="w-full max-w-[350px] py-4">
          <CardHeader className="m-0 border-b [.border-b]:pb-0 py-0">
            <div className="flex justify-between items-center gap-2 w-full">
              <h3 className="text-sm font-semibold">
                <span>Filters & Sorting</span>
              </h3>
              <Button
                variant="ghost"
                className="text-notes font-normal h-auto min-h-auto"
                onClick={onClear}
              >
                Clear all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-start">
              {formattedFilters.map((filter) => (
                <Badge
                  key={filter}
                  className="text-xs break-words whitespace-break-spaces"
                  variant="outline"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
