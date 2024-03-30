"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/20tJpmmWf5L
 */

import { getData } from "@/helpers/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Article } from "..";
import { v4 } from "uuid";
import Loading from "@/app/loading";
import { ChevronRightIcon } from "lucide-react";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import BlockRendererClient from "./BlockRendererClient";

export function BlogHome() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllArticles"],
    queryFn: async () => await getData(`/api/articles`),
  });

  const articles: APIResponseCollection<"api::article.article"> = data;

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  isLoading && <Loading />;

  return (
    <div className="grid gap-6 md:gap-8">
      {data &&
        articles.data.map((article) => (
          <Fragment key={article.id}>
            <div className="space-y-2">
              <Link className="inline-flex" href={`/articles/${article.id}`}>
                <h2 className="text-3xl font-bold tracking-tight">
                  {article.attributes.Title}
                </h2>
              </Link>
              <p className="text-gray-500 dark:text-gray-400">
                {article.attributes.Date?.toString()}
              </p>
            </div>
            <div className="space-y-4">
              {/* <p className="line-clamp-2">
                {article.attributes.Content[0].children[0].text}
              </p> */}
              <p className=" line-clamp-2">
                <BlockRendererClient content={article.attributes.Content!} />
              </p>
              <div className="mt-4">
                <Link
                  className="font-semibold underline hover:underline inline-flex items-center"
                  href={`/articles/${article.id}`}
                >
                  Read more
                  <span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}
