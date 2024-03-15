import { paths } from '@lib/constant';
import { cn } from '@lib/utils';
import { Button, Select } from 'antd';
import { ClassValue } from 'clsx';
import qs from 'query-string';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const status = [
  { label: 'Todo', value: 'todo' },
  { label: 'Progress', value: 'progress' },
  { label: 'Done', value: 'done' },
];

const priority = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const sort = [
  { label: 'ASC', value: 'ASC' },
  { label: 'DESC', value: 'DESC' },
];

interface IProps {
  className?: ClassValue;
}

const BaseFilter: React.FC<IProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn('base_filter', className)}>
      <div className="container">
        <div className="base_filter_wrapper">
          <Button onClick={() => navigate(paths.archive)}>Archive</Button>
          <Select
            allowClear
            showSearch
            placeholder="Status"
            defaultValue={qs.parse(location.search)?.status}
            onChange={(value) =>
              navigate(
                qs.stringifyUrl(
                  {
                    url: location.pathname,
                    query: { ...qs.parse(location.search), status: value },
                  },
                  { skipNull: true },
                ),
              )
            }
            className="w-24"
          >
            {status?.map((status, idx) => (
              <Select.Option key={idx} title={status?.label} value={status?.value} data={status}>
                {status?.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            allowClear
            showSearch
            placeholder="Priority"
            defaultValue={qs.parse(location.search)?.priority}
            onChange={(value) =>
              navigate(
                qs.stringifyUrl(
                  {
                    url: location.pathname,
                    query: { ...qs.parse(location.search), priority: value },
                  },
                  { skipNull: true },
                ),
              )
            }
            className="w-24"
          >
            {priority?.map((priority, idx) => (
              <Select.Option key={idx} title={priority?.label} value={priority?.value} data={priority}>
                {priority?.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            allowClear
            showSearch
            placeholder="Sort"
            defaultValue={qs.parse(location.search)?.sort}
            onChange={(value) =>
              navigate(
                qs.stringifyUrl(
                  {
                    url: location.pathname,
                    query: { ...qs.parse(location.search), sort: value },
                  },
                  { skipNull: true },
                ),
              )
            }
            className="w-24"
          >
            {sort?.map((sort, idx) => (
              <Select.Option key={idx} title={sort?.label} value={sort?.value} data={sort}>
                {sort?.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BaseFilter;
