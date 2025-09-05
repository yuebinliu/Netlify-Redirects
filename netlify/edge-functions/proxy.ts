// netlify/edge-functions/proxy.ts
export default async (request: Request) => {
  const url = new URL(request.url);
  const domainMappings: Record<string, string> = {
    'pr.thanx.top': 'http://106.15.4.153:8085',
    'api.thanx.top': 'http://106.15.4.153:8086',
    'admin.thanx.top': 'http://106.15.4.153:8087'
  };

  const target = domainMappings[url.hostname];
  if (!target) return new Response('Domain not configured', { status: 404 });

  // 准备请求
  const targetUrl = new URL(url.pathname + url.search, target);
  const headers = new Headers(request.headers);
  headers.set('X-Forwarded-Host', url.hostname);
  headers.delete('host');

  const response = await fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.body
  });

  // 处理HTML内容重写
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    let html = await response.text();
    
    // 替换所有原始服务器引用
    const regex = new RegExp(escapeRegExp(target), 'g');
    html = html.replace(regex, `https://${url.hostname}`);
    
    return new Response(html, {
      status: response.status,
      headers: response.headers
    });
  }

  return response;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const config = {
  path: '/*'
};
