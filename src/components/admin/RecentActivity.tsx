import { UserCircleIcon } from "@heroicons/react/24/solid";

const activity = [
    {
        id: 1,
        type: "registration",
        person: { name: "Rahul Sharma", href: "#" },
        date: "1h ago",
        dateTime: "2023-01-23T10:32",
        description: "registered as a new student",
    },
    {
        id: 2,
        type: "complaint",
        person: { name: "Priya Patel", href: "#" },
        date: "3h ago",
        dateTime: "2023-01-23T11:03",
        description: "submitted a maintenance request",
    },
    {
        id: 3,
        type: "payment",
        person: { name: "Amit Kumar", href: "#" },
        date: "5h ago",
        dateTime: "2023-01-23T11:24",
        description: "paid hostel fees",
    },
    {
        id: 4,
        type: "check-in",
        person: { name: "Sneha Gupta", href: "#" },
        date: "1d ago",
        dateTime: "2023-01-22T19:24",
        description: "checked in to Room 101",
    },
];

export default function RecentActivity() {
    return (
        <div className="rounded-lg bg-white shadow">
            <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recent Activity
                </h3>
                <div className="mt-6 flow-root">
                    <ul role="list" className="-mb-8">
                        {activity.map((item, itemIdx) => (
                            <li key={item.id}>
                                <div className="relative pb-8">
                                    {itemIdx !== activity.length - 1 ? (
                                        <span
                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                            aria-hidden="true"
                                        />
                                    ) : null}
                                    <div className="relative flex space-x-3">
                                        <div>
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white">
                                                <UserCircleIcon
                                                    className="h-5 w-5 text-white"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </div>
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    <a
                                                        href={item.person.href}
                                                        className="font-medium text-gray-900"
                                                    >
                                                        {item.person.name}
                                                    </a>{" "}
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                <time dateTime={item.dateTime}>{item.date}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
