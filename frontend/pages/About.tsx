import { useState } from "react";
import { Tab, Tabs, Box, Typography, Card, CardContent } from "@mui/material";
import Image from 'next/image';
import matrixImage from '../public/matrix.png'; // 画像の相対パス

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const About = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label='時間管理のマトリックスとは' value={0} />
                    <Tab label='本アプリケーションの使い方' value={1} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ p: 5 }}>
                    <Typography variant="h4"><strong>時間管理のマトリックスとは</strong></Typography><br />
                    <Typography variant="body1">
                        時間管理のマトリックスとは、スティーブン・R・コヴィー氏が『7つの習慣』という著作の中で提唱したタスク管理のフレームワークです。<br />
                        このマトリックスは、重要度と緊急度の2つの軸を基にタスクを4つのカテゴリーに分類します。これにより、どのタスクに優先的に取り組むべきかを明確にすることができます。
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 8 }}>
                        <Box sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px',overflow: 'hidden', }}>
                            <Image src={matrixImage} alt="Matrix image" width={800} quality={100} />
                        </Box>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}><strong>第１領域：必須の領域（重要かつ緊急なタスク）</strong></Typography>
                    <Typography variant="body1">この領域は、<strong>最優先で対応する必要がある領域</strong>です。    </Typography>
                    <Box sx={{ bgcolor: '#eeeeee', maxWidth: '600px', p: 2, boxShadow: 3, mt: 2 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            <li >重要な会議</li>
                            <li >クレームなどのトラブル対応</li>
                            <li >納期が迫っているプロジェクト</li>
                            <li>重要なメッセージや電話への即時対応</li>
                            <li>サーバーやシステムのダウン対応</li>
                            <li>トラブルシューティングのための迅速な対応</li>
                        </Typography>
                    </Box><br /><br />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}><strong>第２領域：質の高い領域（重要だが緊急ではないタスク）</strong></Typography>
                    この領域は、すぐ対応する必要はないが、<strong>将来的な成果やビジネスの根幹に与える影響が大きい領域</strong>です。<br />
                    この領域のタスクは緊急性が低いため後回しにされがちですが、長期的な目線で見たときに時間を費やす効果が高く、この領域にフォーカスすることが長期的な成功に繋がります。<br /><br />
                    <Box sx={{ bgcolor: '#eeeeee', maxWidth: '600px', p: 2, boxShadow: 3, borderRadius: 0 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            <li >顧客開拓</li>
                            <li >人材育成</li>
                            <li >業務改善</li>
                            <li>新規事業の開拓</li>
                            <li>長期的な目標設定と計画</li>
                            <li>将来のキャリアパスの考察</li>
                            <li>スキルアップのための勉強や自己啓発</li>
                            <li>健康管理（定期的な運動、健康診断）</li>
                            <li>豊かな人間関係の構築</li>
                        </Typography>
                    </Box><br /><br />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}><strong>第３領域：見せかけの領域（緊急だが重要ではないタスク）</strong></Typography>
                    この領域は、<strong>緊急の対応が求められる割には、得られる成果があまりない領域</strong>です。<br />
                    この領域のタスクを重要だと勘違いして対応するケースが少なくありません。<br />
                    しかし、この領域に多くの時間を割いても生産性が上がる可能性は低いため、やらないという判断や、発生を防ぐといったアプローチを取ることが大切です。<br /><br />
                    <Box sx={{ bgcolor: '#eeeeee', maxWidth: '600px', p: 2, boxShadow: 3, borderRadius: 0 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            <li >重要でない電話・メール</li>
                            <li >意味や目的のない会議</li>
                            <li >中身のない報告書の作成</li>
                            <li>予期せぬ訪問者の対応</li>
                            <li>突発的な部下や同僚からの質問への対応</li>
                            <li>急ぎの雑務</li>
                            <li >無意味な接待や飲み会</li>
                        </Typography>
                    </Box><br /><br />
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}><strong>第４領域：無駄な領域（重要でも緊急でもないタスク）</strong></Typography>
                    この領域には、<strong>将来的な成果は見込めない無駄な領域</strong>です。<br />
                    第１領域のタスクの対応にずっと追われていると、この領域に逃げたくなることもあります。適度に休息を挟みつつ、本当にフォーカスすべきことは何かを客観視することが大切です。<br /><br />
                    <Box sx={{ bgcolor: '#eeeeee', maxWidth: '600px', p: 2, boxShadow: 3, borderRadius: 0 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            <li>重要でない会議への参加</li>
                            <li>不必要なメールの確認</li>
                            <li >無意味なSNS・ショート動画閲覧</li>
                            <li >うわさ話などの暇つぶしの雑談</li>
                            <li >現実逃避</li>
                            <li >待ち時間</li>
                            <li>スマホゲームやアプリでの時間つぶし</li>
                            <li>ショッピング</li>
                        </Typography>
                    </Box><br /><br />
                    <Box sx={{ bgcolor: '#e0f7fa', maxWidth: '1200px', p: 2, boxShadow: 3, borderRadius: 0 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            時間管理のマトリックスを活用することで、「不要なタスクの見極め」「リソースの適切な分配」を実現し、ビジネスなどで大きな成果を得ることができます。
                        </Typography>
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Box sx={{ p: 5 }}>
                    <Typography variant="h4"><strong>本アプリケーションの使い方</strong></Typography><br />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        このアプリケーションは、タスクを「時間管理のマトリックス」に基づいて分類し、効果的に管理するためのツールです。<br />
                        以下の手順に従ってタスクを追加し、管理してください。
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 8, mb: 2 }}><strong>1. タスクの追加</strong></Typography>
                    <Box sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '6px',overflow: 'hidden', maxWidth: '500px' }}><img src="taskWindow.png" alt="タスクの追加" /></Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        画面中央にある追加ボタン（+アイコン）をクリックするとタスクの入力ウィンドウが表示されます。<br />
                        タスクの内容の入力と、「重要度」「緊急度」を設定し、追加ボタンをクリックします。
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 8, mb: 2 }}><strong>2. タスクの表示</strong></Typography>
                    <Box sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px',overflow: 'hidden', maxWidth: '500px' }}><img src="slide2.png" alt="タスクの表示" /></Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        タスクはそれぞれのカテゴリー（重要×緊急、重要×緊急でない、重要でない×緊急、重要でない×緊急でない）に分類され、対応する4つの   エリアに表示されます。
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 8, mb: 2 }}><strong>3. タスクの管理</strong></Typography>
                    <Box sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '6px',overflow: 'hidden', width: '200px' }}><img src="task.png" /></Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        各タスクにはチェックボックスと削除ボタンがあります。タスクが完了したらチェックボックスをクリックし、不要になったタスクは削除ボタンをクリックして削除します。
                    </Typography>
                    <br /><br />
                    <Box sx={{ bgcolor: '#e0f7fa', maxWidth: '860px', p: 2, boxShadow: 3, borderRadius: 0 }}>
                        <Typography component="ul" sx={{ listStyleType: 'disc', listStylePosition: 'inside', pl: 2 }}>
                            本アプリケーションを使用することで、不要なタスクを見極め、リソースの分配を適切に行うことができます。
                        </Typography>
                    </Box>
                </ Box>
            </TabPanel>
        </Box>
    );
};

export default About;
