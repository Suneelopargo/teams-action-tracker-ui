import { useEffect, useState } from 'react';

import {
  getActionItems,
  updateStatus,
} from '../../services/actionItem.service';

import './actionitem.css';

export default function ActionItems() {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, search, statusFilter]);

  const loadItems = async () => {
    try {
      const data =
        await getActionItems();

      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterItems = () => {
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

    setFilteredItems(result);
  };

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

      <h1>Action Items</h1>

      <div className="toolbar">

        <input
          type="text"
          placeholder="Search..."
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

                <td>{item.id}</td>

                <td>
                  {item.ownerName}
                </td>

                <td>
                  {item.ownerEmail}
                </td>

                <td>
                  {item.actionText}
                </td>

                <td>
                  <span
                    className={`priority ${item.priority}`}
                  >
                    {item.priority}
                  </span>
                </td>

                <td>

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

                <td>
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
  );
}