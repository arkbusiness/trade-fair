import {
  ExhibitorOverviewStat,
  RecentAppointments,
  RecentOrdersTable,
  ExhibitorOverviewChart
} from '../molecules';

export default function ExhibitorOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <ExhibitorOverviewStat />
      <div className="grid lg:grid-cols-[1fr_30.06rem] gap-x-[0.87rem] gap-y-5">
        <RecentOrdersTable />
        <RecentAppointments />
      </div>
      <ExhibitorOverviewChart />
    </div>
  );
}
