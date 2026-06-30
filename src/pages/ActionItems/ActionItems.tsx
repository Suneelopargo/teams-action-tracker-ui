import { useEffect, useMemo, useState } from 'react';

import {
  getActionItems,
  updateStatus,
} from '../../services/actionItem.service';

import './actionitem.css';

interface ActionItem {
  id: number;
  ownerName: string;
  ownerEmail: string;
  actionText: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  dueDate?: string;
}

export default function ActionItems() {
  const [items, setItems] = useState<ActionItem[]>([]);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

  const loadItems = async () => {
    try {
      const data =
        await getActionItems();

      setItems(data as ActionItem[]);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (statusFilter !== 'ALL') {
      result = result.filter(
        (item) =>
          item.status === statusFilter,
      );
    }

    if (search) {
      result = result.filter(
        (item) =>
          item.ownerName
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          item.actionText
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ),
      );
    }

    return result;
  }, [items, search, statusFilter]);

  useEffect(() => {
    let active = true;

    getActionItems()
      .then((data) => {
        if (active) {
          setItems(data as ActionItem[]);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  const handleStatusChange =
    async (
      id: number,
      status: string,
    ) => {
      try {
        await updateStatus(
          id,
          status,
        );

        await loadItems();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="action-page">
      <div className="action-shell">

        <div className="action-hero">
          <span className="action-eyebrow">Task tracking</span>
          <h1>Action Items</h1>
          <p>
            Review extracted tasks, filter by status, and keep ownership moving
            through the meeting follow-up workflow.
          </p>
        </div>

        <div className="action-table-card">
          <div className="action-table-header">
            <h2>Action item list</h2>
            <span>{filteredItems.length} records</span>
          </div>

          <div className="toolbar">

            <input
              type="text"
              placeholder="Search by owner or action..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value,
                )
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value,
                )
              }
            >
              <option value="ALL">
                All
              </option>

              <option value="OPEN">
                Open
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="BLOCKED">
                Blocked
              </option>
            </select>

          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Email</th>
                  <th>Action Item</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>

              <tbody>

                {filteredItems.map(
                  (item) => (
                    <tr key={item.id}>

                      <td data-label="ID">{item.id}</td>

                      <td data-label="Owner">
                        {item.ownerName}
                      </td>

                      <td data-label="Email">
                        {item.ownerEmail}
                      </td>

                      <td data-label="Action Item">
                        {item.actionText}
                      </td>

                      <td data-label="Priority">
                        <span
                          className={`priority ${item.priority}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td data-label="Status">

                        <select
                          className="status-select"
                          value={
                            item.status
                          }
                          onChange={(
                            e,
                          ) =>
                            handleStatusChange(
                              item.id,
                              e.target
                                .value,
                            )
                          }
                        >
                          <option value="OPEN">
                            OPEN
                          </option>

                          <option value="IN_PROGRESS">
                            IN_PROGRESS
                          </option>

                          <option value="COMPLETED">
                            COMPLETED
                          </option>

                          <option value="BLOCKED">
                            BLOCKED
                          </option>
                        </select>

                      </td>

                      <td data-label="Due Date">
                        {item.dueDate
                          ? new Date(
                            item.dueDate,
                          ).toLocaleDateString()
                          : '-'}
                      </td>

                    </tr>
                  ),
                )}

              </tbody>

            </table>

          </div>
        </div>
      </div>

    </div>
  );
}
